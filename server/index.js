import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import contactRoutes from './routes/contact.js'
import adminRoutes from './routes/admin.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json({ limit: '50kb' }))

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'SKU Infotech API running' })
})

app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)


app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }))


const dist = path.join(__dirname, '../dist')
app.use(express.static(dist))
app.get('/{*splat}', (req, res) => res.sendFile(path.join(dist, 'index.html')))

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
})