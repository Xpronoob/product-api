import bcrypt from 'bcrypt'
import { validateAccount } from '../models/user.model.js'
// import { pool } from '../../database/mysq.local.js'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { signToken } from './jwt.service.js'

dotenv.config()

const prisma = new PrismaClient()

export const register = async (req, res) => {
  try {
    const { email, password, name, lastName } = req.body
    const validate = validateAccount(email, password)
    if (!validate) {
      res.status(500).json({ error: 'Error al registrarse' })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const result = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          lastName
        }
      })

      // console.log(result)
      const token = await signToken(result)
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict' })
      res.status(200).json({
        id: result.id,
        email: result.email,
        name: result.name,
        lastName: result.lastName
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!user) return res.status(400).json({ message: 'User not found' })

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    // jwt.services
    const token = await signToken(user)

    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' })
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName
    })
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' })
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) })
  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await prisma.user.findUnique({
    where: {
      id: req.user.id
    }
  })

  // console.log(typeof req.user.id)
  // console.log(`req.user.id = ${req.user.id}`)
  // console.log(userFound)
  if (!userFound) return res.status(404).json({ message: 'User not found' })

  return res.json({
    id: userFound.id,
    email: userFound.email,
    name: userFound.name,
    lastName: userFound.lastName
  })
}
