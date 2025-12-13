import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.ts'

const router = express.Router()

// /auth/register endpoint
router.post('/register', async (req, res) => {
    const {username, password} = req.body
    
    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" })
    }
    
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    const hashedPassword = bcrypt.hashSync(password, 8)
    
    try {
        const user = await prisma.user.create({
            data: {  
                username,
                password: hashedPassword
            }
        })

        // Create token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: '24h'})
        res.json({token})
        
    } catch (error: any)
    {
        console.log(error.message)
        
        // Better error handling
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "Username already exists" })
        }
        
        res.status(503).json({ message: "Service unavailable" })
    }
})  

// /auth/login endpoint
router.post('/login', async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await prisma.user.findUnique({
            where: {username}
        })

        if(!user) {
            return res.status(404).json({message: "Invalid username or password"})
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if(!passwordIsValid) {
            return res.status(401).json({message: "Invalid username or password"})
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: '24h'})
        res.json({token})

    } catch (error: any)
    {
        console.log(error.message)
        res.status(503).json({ message: "Service unavailable" })
    }
})

export default router







