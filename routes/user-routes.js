import express from 'express'
import {
  signup,
  login,
  verifyEmailAddress,
  verificationEmailCode,
} from '../controllers/index.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/verify', verificationEmailCode)
router.post('/verifyEmailAddress', verifyEmailAddress)

export default router
