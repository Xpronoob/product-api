import { Router } from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  profileUser
} from '../controllers/auth.controller.js'

import { verifyToken } from '../middlewares/auth.middleware.js'

export const authRouter = Router()

// User registration
authRouter.post('/register', (req, res) => {
  registerUser(req, res)
})

// User login
authRouter.post('/login', (req, res) => {
  loginUser(req, res)
})

// User logout
authRouter.post('/logout', (req, res) => {
  logoutUser(req, res)
})

// User profile Middleware: verifyToken
authRouter.get('/profile', verifyToken, (req, res) => {
  profileUser(req, res)
})
