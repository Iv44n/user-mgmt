import { Router } from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { SALTS } from '../utils/config.js'

const usersRouter = Router()

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})

usersRouter.post('/', async (req, res) => {
  const { name, username, password, email, phoneNumber } = req.body

  if (!name || !username || !password || !email) {
    return res.status(400).json({ error: 'Missing required information' })
  }

  if (password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters long' })
  }

  const passwordHash = await bcrypt.hash(password, SALTS)

  const user = new User({
    name,
    username,
    passwordHash,
    email
  })

  if (phoneNumber) {
    user.phoneNumber = phoneNumber
  }

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

usersRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const newUser = req.body

  const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true })

  res.json(updatedUser)
})

usersRouter.put('/:id/password', async (req, res) => {
  const userId = req.params.id
  const { oldPassword, newPassword } = req.body

  if (oldPassword === newPassword) {
    return res.status(400).json({ error: 'The new password must be different from the old password' })
  }

  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.passwordHash)
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const passwordHash = await bcrypt.hash(newPassword, SALTS)

  user.passwordHash = passwordHash
  await user.save()

  res.json({
    message: 'Password updated successfully'
  })
})

export default usersRouter
