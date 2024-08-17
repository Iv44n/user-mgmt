export interface User {
  id: string
  name: {
    firstName: string
    lastName: string
  }
  username: string
  email: string
  phoneNumber?: string
}

export interface Errors {
  invalidPassword: {
    passwordError: {
      error: boolean
      helperText: string
    }
    incorrectPassword: {
      error: boolean
      helperText: string
    }
  }
  invalidName: {
    firstName: {
      error: boolean
      helperText: string
    }
    lastName: {
      error: boolean
      helperText: string
    }
  }
  invalidUserName: { error: boolean; helperText: string }
}

export type Success = {
  message: string
  isActive: boolean
}

export type UpdatePasswordParams = {
  passwordData: {
    oldPassword: string
    newPassword: string
  }
  userId: string
}

export interface ReturnUpdate {
  statusText: 'OK' | 'ERROR'
  isError: boolean
  helperText: string
  data?: User
}
