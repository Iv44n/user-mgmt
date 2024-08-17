import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { SALTS } from '../utils/config.js'

const userSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  passwordHash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  }
})

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

const createAdminUser = async () => {
  const existingUser = await User.findOne({ username: 'admin' })
  if (existingUser) {
    console.log('Admin user already exists')
    return
  }

  const passwordHash = await bcrypt.hash('admin', SALTS)

  const admin = new User({
    name: {
      firstName: 'Admin',
      lastName: 'User'
    },
    username: 'admin',
    passwordHash,
    email: 'admin@localhost',
    phoneNumber: '1234567890'
  })

  await admin.save()
  console.log('Admin user created')
}

createAdminUser()

export default User
