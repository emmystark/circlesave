import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes'
import circleRoutes from './routes/circleRoutes'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT ?? 3000

// CORS so frontend on Vite (http://localhost:5173) can call this API
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

// Parse JSON bodies
app.use(express.json())

// API routes - must come before static file serving
app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/auth', authRoutes)
app.use('/circles', circleRoutes)

// Serve static files from /public directory (includes index.html for root path)
const publicPath = path.join(__dirname, '..', 'public')
app.use(express.static(publicPath, { index: 'index.html' }))

// ✅ FIXED: Use middleware instead of app.get() for catch-all
app.use((req, res) => {
	// Skip if it's an API route or asset request
	if (
		req.path.startsWith('/assets/') ||
		req.path.startsWith('/auth/') ||
		req.path.startsWith('/circles/') ||
		req.path.startsWith('/health')
	) {
		return res.status(404).send('Not found')
	}
	res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Backend server listening on http://localhost:${PORT}`)
}).on('error', (err) => {
	// eslint-disable-next-line no-console
	console.error('Server error:', err)
})