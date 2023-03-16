import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { UserRouter } from './routes/index.js'

import connectDB from './config/db.js'

dotenv.config()

const PORT = process.env.PORT ?? 4000

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user', UserRouter)

app.listen(PORT, () => console.log(`Server is running on a port ${PORT}`))
