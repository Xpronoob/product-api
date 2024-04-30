import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const signToken = async (req, res) => {
  const privateKey = process.env.JWT_SECRET_KEY

  // Extract request parameters
  const { id, email } = req
  try {
    const payload = {
      id,
      email,
      exp: Date.now() + 120 * 1000 // Token expiration time (1 minute)
    }

    // Create token
    // jwt.sign(payload{}, privateKey, algorithm{}, function (err, token) {)
    const token = jwt.sign(payload, privateKey)

    return token
  } catch (err) {
    console.error('Error creating token:', err)
    throw new Error('Error creating token')
  }
}
