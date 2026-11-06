import dns from 'node:dns'
import mongoose from 'mongoose'

dns.setServers(['8.8.8.8', '1.1.1.1'])

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  }
}