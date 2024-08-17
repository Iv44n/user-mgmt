import { Box } from '@mui/material'
import PasswordInput from '../components/PasswordInput'
import { useUserStore } from '../store/userStore'
import { FormEvent, useEffect, useState } from 'react'
import ButtonExtended from '../components/Button'
import { Errors } from '../types/user'

const initialFormData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

function PasswordPage() {
  const { updatePassword, user, errors, setErrors, setSuccess } = useUserStore()
  const [formData, setFormData] = useState(initialFormData)

  const incorrectPassword = errors?.invalidPassword?.incorrectPassword
  const passwordError = errors?.invalidPassword?.passwordError

  useEffect(() => {
    setFormData(initialFormData)
  }, [user])

  useEffect(() => validatePassword(), [formData.confirmPassword])

  const validatePassword = () => {
    const { newPassword, confirmPassword } = formData
    const isConfirmPasswordValid = newPassword !== confirmPassword

    const errorState = {
      ...errors,
      invalidPassword: {
        ...errors?.invalidPassword,
        passwordError: {
          error: isConfirmPasswordValid,
          helperText: isConfirmPasswordValid ? 'Passwords do not match' : '',
        },
      },
    } as Errors

    setErrors(errorState)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { currentPassword, newPassword } = formData
    const passwordData = { oldPassword: currentPassword, newPassword }

    const res = await updatePassword({
      userId: user?.id as string,
      passwordData,
    })

    if (res.isError) {
      handleErrors(res.helperText)
    } else {
      handleSuccess(res.helperText)
    }
  }

  const handleErrors = (helperText: string) => {
    const errorMap = {
      'Invalid password': {
        incorrectPassword: { error: true, helperText },
        passwordError: { error: false, helperText: '' },
      },
      'The new password must be different from the old password': {
        incorrectPassword: { error: false, helperText: '' },
        passwordError: { error: true, helperText },
      },
    }
    setErrors({
      ...errors,
      invalidPassword: errorMap[helperText as keyof typeof errorMap],
    } as Errors)
  }

  const handleSuccess = (message: string) => {
    setFormData(initialFormData)
    setSuccess({ message, isActive: true })
  }

  const handleChange = (value: string, inputId: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [inputId]: value }))
    resetErrors()
  }

  const resetErrors = () => {
    setErrors({
      ...errors,
      invalidPassword: {
        incorrectPassword: { error: false, helperText: '' },
        passwordError: { error: false, helperText: '' },
      },
    } as Errors)
  }

  return (
    <Box
      component='form'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      height='100%'
      onSubmit={handleSubmit}
    >
      <div>
        <PasswordInput
          id='currentPassword'
          label='Current Password'
          value={formData.currentPassword}
          handleChange={handleChange}
          error={incorrectPassword?.error}
          helperText={incorrectPassword?.helperText}
        />
        <PasswordInput
          id='newPassword'
          label='New Password'
          value={formData.newPassword}
          handleChange={handleChange}
          error={passwordError?.error}
          helperText={passwordError?.helperText}
        />
        <PasswordInput
          id='confirmPassword'
          label='Confirm New Password'
          value={formData.confirmPassword}
          handleChange={handleChange}
          error={passwordError?.error}
          helperText={passwordError?.helperText}
        />
        <p className='text-center text-sky-600'>Forgot password?</p>
      </div>
      <ButtonExtended
        disabled={incorrectPassword?.error || passwordError?.error}
      />
    </Box>
  )
}

export default PasswordPage
