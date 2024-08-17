import { create } from 'zustand'
import axios from 'axios'
import {
  Errors,
  ReturnUpdate,
  Success,
  UpdatePasswordParams,
  User,
} from '../types/user'
import { handleAxiosError } from '../utils/handleAxiosError'

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  login: (username: string, password: string) => Promise<User | null>
  updateUser: (user: User) => Promise<ReturnUpdate>
  updatePassword: (
    updatePasswordParams: UpdatePasswordParams
  ) => Promise<ReturnUpdate>
  errors: Errors | null
  setErrors: (errors: Errors) => void
  success: {
    message: string
    isActive: boolean
  }
  setSuccess: (success: Success) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  errors: null,
  setErrors: (errors) => set({ errors }),
  success: {
    message: '',
    isActive: false,
  },
  setSuccess: (success) => {
    set({ success })
    setTimeout(() => set({ success: { message: '', isActive: false } }), 2000)
  },
  login: async (username, password) => {
    try {
      const { data } = await axios.post<User>('/api/login', {
        username,
        password,
      })
      return data || null
    } catch (error) {
      console.error('Failed to login', error)
      return null
    }
  },
  updateUser: async (user) => {
    try {
      const res = await axios.put<User>(`/api/users/${user.id}`, user)
      return {
        statusText: 'OK',
        isError: false,
        helperText: 'User updated successfully',
        data: res.data,
      }
    } catch (error) {
      return handleAxiosError(error, (errorMessage) => ({
        statusText: 'ERROR',
        isError: true,
        helperText: errorMessage,
      }))
    }
  },
  updatePassword: async ({ userId, passwordData }) => {
    try {
      const res = await axios.put(`/api/users/${userId}/password`, passwordData)
      return {
        statusText: 'OK',
        isError: false,
        helperText: res.data.message,
      }
    } catch (error) {
      return handleAxiosError(error, (errorMessage) => ({
        statusText: 'ERROR',
        isError: true,
        helperText: errorMessage,
      }))
    }
  },
}))
