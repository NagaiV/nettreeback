import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI ?? '')
  const cyan = colors.cyan
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

export default connectDB
