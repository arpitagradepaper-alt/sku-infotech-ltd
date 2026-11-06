import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150 },
    phone: { type: String, trim: true, maxlength: 30, default: '' },
    service: { type: String, trim: true, maxlength: 100, default: '' },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Message', messageSchema)