import { create } from 'zustand'
import axios from 'axios'
import { User } from '../types/user'

interface Errors {
  passwordError: { error: boolean; helperText: string }
  invalidPassword: { error: boolean; helperText: string }
}

type PasswordData = {
  oldPassword: string
  newPassword: string
}

interface ReturnUpdate {
  statusText: 'OK' | 'ERROR'
  isError: boolean
  helperText: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  getUser: (id: string) => Promise<void>
  updateUser: (user: User) => Promise<void>
  updatePassword: (
    passwordData: PasswordData,
    userId: string
  ) => Promise<ReturnUpdate>
  errors: Errors
  setErrors: (errors: Errors) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  getUser: async (id) => {
    try {
      const { data } = await axios.get<User>(`/api/users/${id}`)
      set({ user: data })
    } catch (error) {
      console.error('Failed to fetch user', error)
    }
  },
  updateUser: async (user) => {
    try {
      const { data } = await axios.put<User>(`/api/users/${user.id}`, user)
      set({ user: data })
    } catch (error) {
      console.error('Failed to update user', error)
    }
  },
  updatePassword: async (passwordData, userId) => {
    try {
      const res = await axios.put(`/api/users/${userId}/password`, passwordData)
      return res.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error
        return { statusText: 'ERROR', isError: true, helperText: errorMessage }
      }
    }
  },
  errors: {
    passwordError: { error: false, helperText: '' },
    invalidPassword: { error: false, helperText: '' },
  },
  setErrors: (errors) => set({ errors }),
}))
