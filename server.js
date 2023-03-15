import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/db'

dotenv.config()

const PORT = process.env.PORT ?? 4000

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', (req, res) => {
  res.send('Hello from net-tree backend')
})

app.listen(PORT, () => console.log(`Server is running on a port ${PORT}`))
