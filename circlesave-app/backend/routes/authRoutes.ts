import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient'
import { google } from 'googleapis'

const router = express.Router()

// Local register endpoint (email/password)
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({ message: 'Username and password required' })
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' })

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' })
        return res.json({ token })
    } catch (error: any) {
        console.error('register error', error)
        if (error.code === 'P2002') return res.status(400).json({ message: 'Username already exists' })
        return res.status(503).json({ message: 'Service unavailable' })
    }
})

// Local login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { username } })
        if (!user || !user.password) return res.status(401).json({ message: 'Invalid username or password' })

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(401).json({ message: 'Invalid username or password' })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' })
        return res.json({ token })
    } catch (error: any) {
        console.error('login error', error)
        return res.status(503).json({ message: 'Service unavailable' })
    }
})

// Google OAuth helpers and routes
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
)

router.get('/getAuthUrl', (_req, res) => {
    const scope = ['openid', 'profile', 'email']
    const url = oauth2Client.generateAuthUrl({ access_type: 'offline', scope, prompt: 'consent' })
    res.json({ url })
})

router.get('/oauth2callback', async (req, res) => {
    const code = req.query.code as string | undefined
    if (!code) return res.status(400).send('Missing code')

    try {
        const { tokens } = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens)

        if (!tokens.id_token) throw new Error('No id_token')
        const ticket = await oauth2Client.verifyIdToken({ idToken: tokens.id_token, audience: process.env.GOOGLE_CLIENT_ID })
        const payload = ticket.getPayload()
        const email = payload?.email
        const name = payload?.name ?? ''
        const googleId = payload?.sub
        if (!email) throw new Error('No email in id token')

        // Upsert user: create if not exists, otherwise update fields
        const user = await prisma.user.upsert({
            where: { username: email },
            update: { name, googleId },
            create: { username: email, name, googleId },
        })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' })
        const frontend = process.env.FRONTEND_URL || 'http://localhost:5173'
        return res.redirect(`${frontend}/?token=${token}`)
    } catch (err) {
        console.error('oauth callback error', err)
        return res.status(500).send('Authentication failed')
    }
})

// Update user's wallet address
router.put('/wallet', async (req, res) => {
    const token = req.headers['authorization']
    if (!token) return res.status(401).json({ message: 'No token provided' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }
        const { walletAddress } = req.body

        if (!walletAddress) {
            return res.status(400).json({ message: 'Wallet address is required' })
        }

        // Check if wallet address is already taken by another user
        const existingUser = await prisma.user.findUnique({
            where: { walletAddress },
        })

        if (existingUser && existingUser.id !== decoded.id) {
            return res.status(400).json({ message: 'Wallet address already in use' })
        }

        const user = await prisma.user.update({
            where: { id: decoded.id },
            data: { walletAddress },
            select: {
                id: true,
                username: true,
                name: true,
                walletAddress: true,
            },
        })

        return res.json({ message: 'Wallet address updated', user })
    } catch (error: any) {
        console.error('Update wallet error:', error)
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' })
        }
        return res.status(500).json({ message: 'Failed to update wallet address' })
    }
})

export default router







