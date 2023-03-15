import { model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const SALT = process.env.SALT ?? 0

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    emailVerifyCode: {
      type: String,
    },
    verificationDate: {
      type: Date,
    },
    isEmailverified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(SALT, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

const User = model('user', UserSchema)
export default User
