import { Router } from 'express'
import mongoose from 'mongoose'
import Message from '../models/Message.js'

const router = Router()

// frontend `id` use karta hai, MongoDB `_id` deta hai, isliye convert karte hain
const shape = (m) => ({
  id: m._id.toString(),
  name: m.name,
  email: m.email,
  phone: m.phone,
  service: m.service,
  message: m.message,
  read: m.read,
  createdAt: m.createdAt,
})

const validId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid message id' })
  }
  next()
}


router.get('/messages', async (req, res) => {
  try {
    const list = await Message.find().sort({ createdAt: -1 })
    res.json(list.map(shape))
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Could not load messages' })
  }
})


router.patch('/messages/:id', validId, async (req, res) => {
  try {
    const m = await Message.findByIdAndUpdate(
      req.params.id,
      { read: Boolean(req.body.read) },
      { new: true }
    )
    if (!m) return res.status(404).json({ error: 'Message not found' })
    res.json(shape(m))
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Could not update message' })
  }
})

// delete
router.delete('/messages/:id', validId, async (req, res) => {
  try {
    const m = await Message.findByIdAndDelete(req.params.id)
    if (!m) return res.status(404).json({ error: 'Message not found' })
    res.json({ success: true })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Could not delete message' })
  }
})

export default router