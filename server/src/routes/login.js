import { Router } from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required information' })
  }

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  res.json(user)
})

export default loginRouter
