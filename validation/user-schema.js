import Joi from 'joi'

const Email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
})

const UserJoiSchema = {
  createUser: (data) => {
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      email: Email,
      password: Joi.string().min(8).max(30).required(),
    })
    return schema.validate(data)
  },
  loginUser: (data) => {
    const schema = Joi.object({
      email: Email,
      password: Joi.string().min(8).max(30).required(),
    })
    return schema.validate(data)
  },

  verifyEmail: (data) => {
    const schema = Joi.object({
      email: Email,
    })
    return schema.validate(data)
  },
  verifyEmailCode: (data) => {
    const schema = Joi.object({
      verifyCode: Joi.string().min(4).max(4),
      email: Email,
    })
    return schema.validate(data)
  },
}

export default UserJoiSchema
