
import express from 'express'

const router = express.Router()

router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Contact API working successfully'
  })
})

export default router
