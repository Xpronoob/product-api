import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import { router } from './app/routes/index.routes.js'

// Configurations
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
)

// Routes
app.use('/api/v1/', router)

// Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
