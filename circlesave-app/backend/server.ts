import 'dotenv/config'
import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT ?? 3000

// Serve static files from /public directory
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/health', (_req, res) => res.json({ ok: true }))

// Fallback to index.html for SPA routes (catch-all for client-side routing)
app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Backend server listening on http://localhost:${PORT}`)
})
