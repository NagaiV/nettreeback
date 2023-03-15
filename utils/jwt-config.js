import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? ''

export function createToken(userId) {
  const expiresIn = 3600 * 24 * 24
  const secret = JWT_SECRET
  const dataStoredInToken = {
    userId: userId,
  }

  const token = jwt.sign(dataStoredInToken, secret, {
    expiresIn,
    algorithm: 'HS512',
    noTimestamp: true,
  })

  const accessToken = 'Bearer ' + token
  return { expiresIn, accessToken }
}
