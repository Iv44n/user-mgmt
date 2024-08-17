import { Box } from '@mui/material'
import PasswordInput from '../components/PasswordInput'
import { useUserStore } from '../store/userStore'
import { FormEvent, useEffect, useState } from 'react'
import ButtonExtended from '../components/Button'

const initialFormData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

function PasswordPage() {
  const { updatePassword, user, errors, setErrors } = useUserStore()
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const { newPassword, confirmPassword } = formData
    if (newPassword !== confirmPassword) {
      setErrors({
        ...errors,
        passwordError: { error: true, helperText: 'Passwords do not match' },
      })
    } else {
      setErrors({ ...errors, passwordError: { error: false, helperText: '' } })
    }
  }, [formData.confirmPassword])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { currentPassword, newPassword } = formData

    const res = await updatePassword(
      { oldPassword: currentPassword, newPassword },
      user?.id || ''
    )

    if (res.isError && res.statusText === 'ERROR') {
      setErrors({
        ...errors,
        invalidPassword: { error: res.isError, helperText: res.helperText },
      })
    }
  }

  const handleChange = (value: string, inputId: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [inputId]: value }))
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
          error={errors.invalidPassword.error}
          helperText={errors.invalidPassword.helperText}
        />
        <PasswordInput
          id='newPassword'
          label='New Password'
          value={formData.newPassword}
          handleChange={handleChange}
          error={errors.passwordError.error}
          helperText={errors.passwordError.helperText}
        />
        <PasswordInput
          id='confirmPassword'
          label='Confirm New Password'
          value={formData.confirmPassword}
          handleChange={handleChange}
          error={errors.passwordError.error}
          helperText={errors.passwordError.helperText}
        />
        <p className='text-center text-sky-600'>Forgot password?</p>
      </div>
      <ButtonExtended />
    </Box>
  )
}

export default PasswordPage
