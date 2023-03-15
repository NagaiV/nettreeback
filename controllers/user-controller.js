import { UserModel } from '../models/index.js'
import UserJoiSchema from '../validation/user-schema.js'
import { generateRandomToken } from '../utils/index.js'
import bcrypt from 'bcryptjs'
import {
  createToken,
  emailSender,
  checkDifferenceInMinutes,
} from '../utils/index.js'

const signup = async (req, res) => {
  try {
    const { email } = req.body
    const validation = UserJoiSchema.createUser(req.body)
    const { error } = validation

    if (error) return res.status(400).send(error.details[0].message)

    const isExist = await UserModel.findOne({ email })
    if (isExist) return res.send({ message: 'Email already exists!' })

    const emailVerifyCode = await generateRandomToken()
    const newDate = new Date()
    const verificationDate = newDate.setMinutes(newDate.getMinutes() + 1)

    const data = {
      ...req.body,
      emailVerifyCode,
      verificationDate,
    }

    const user = new UserModel(data)
    await user.save()

    return res.send({
      message: 'User Created!',
      data: user,
    })
  } catch (error) {
    console.log('error', error)
    return res.status(500).send('Server error!')
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.send({
        message: 'Invalid Credentials email!',
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.send({
        message: 'Invalid Credentials! password',
      })
    }

    const { accessToken } = createToken(user._id)

    return res.send({
      message: 'User logged in!',
      data: {
        user,
        token: accessToken,
      },
    })
  } catch (error) {
    console.log('error', error)
    return res.status(500).send('Server error!')
  }
}

const verificationEmailCode = async (req, res) => {
  try {
    const { email } = req.body
    const validation = UserJoiSchema.verifyEmail(req.body)
    const { error } = validation

    if (error) return res.status(400).send(error.details[0].message)
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.send({ message: 'Email not found!' })
    }
    const emailVerifyCode = await generateRandomToken()
    const newDate = new Date()
    const verificationDate = newDate.setMinutes(newDate.getMinutes() + 1)

    let dummyUser = user

    dummyUser.verificationDate = new Date(verificationDate)
    dummyUser.emailVerifyCode = emailVerifyCode
    await dummyUser.save()

    emailSender(
      dummyUser?.personalInfo?.email ?? '',
      '',
      'Email Verification',
      'Your Verifiaction Code is ' + emailVerifyCode,
      ''
    )
    return res.send({
      message: 'Verification Code sent and expires in 1 minute!',
    })
  } catch (error) {
    console.log('error', error)
    return res.status(500).send('Server error!')
  }
}

const verifyEmailAddress = async (req, res) => {
  try {
    const { verifyCode, email } = req.body
    const validation = UserJoiSchema.verifyEmailCode(req.body)
    const { error } = validation

    if (error) return res.status(400).send(error.details[0].message)

    const user = await UserModel.findOne({
      email,
      emailVerifyCode: verifyCode,
    })

    if (!user) {
      return res.send({ message: 'Invalid Code' })
    }

    const d1 = new Date()
    const d2 = new Date(user.verificationDate)

    const timeDifferece = checkDifferenceInMinutes(d2, d1)
    if (timeDifferece > 1) {
      return res.send({ message: 'Code is Expired' })
    }

    user['isEmailverified'] = true
    user['emailVerifyCode'] = ''
    await user.save()

    return res.send({
      message: 'Email is Verified',
    })
  } catch (error) {
    console.log('error', error)
    return res.status(500).send('Server error!')
  }
}

export { signup, login, verificationEmailCode, verifyEmailAddress }
