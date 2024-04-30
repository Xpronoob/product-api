import { login, register, logout, profile } from '../services/auth.services.js'

export const registerUser = (req, res) => {
  register(req, res)
}

export const loginUser = (req, res) => {
  login(req, res)
}

export const logoutUser = (req, res) => {
  logout(req, res)
}

export const profileUser = (req, res) => {
  profile(req, res)
}
