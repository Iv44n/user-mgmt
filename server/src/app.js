import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/config.js'
import usersRouter from './routes/users.js'
import { errorHandler, unknownEndpoint } from './utils/middlewares.js'

const app = express()
app.use(express.json())

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
