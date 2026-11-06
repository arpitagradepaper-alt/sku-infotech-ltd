import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import Message from '../models/Message.js'

const router = Router()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { success: false, error: 'Too many requests. Please try again later.' },
})

router.post('/', limiter, async (req, res) => {
  try {
    const { name, email, phone, service, message, botcheck } = req.body

    if (botcheck) return res.json({ success: true })

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, error: 'Name, email and message are required.' })
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email.' })
    }

    await Message.create({ name, email, phone, service, message })
    res.status(201).json({ success: true })
  } catch (err) {
    console.error('Contact error:', err.message)
    res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' })
  }
})

export default router