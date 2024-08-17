import { Box } from '@mui/material'
import { useUserStore } from '../store/userStore'
import { FormEvent, useEffect, useState } from 'react'
import ButtonExtended from '../components/Button'
import BasicInput from '../components/BasicInput'
import { Errors } from '../types/user'

function NamePage() {
  const { user, setUser, updateUser, errors, setErrors, setSuccess } =
    useUserStore()
  const [name, setName] = useState(
    user?.name || { firstName: '', lastName: '' }
  )
  const firstName = errors?.invalidName?.firstName
  const lastName = errors?.invalidName?.lastName

  useEffect(() => validateName(), [name])

  const validateName = () => {
    const firstNameError = name.firstName.length < 3
    const lastNameError = name.lastName.length < 3

    const newErrors = {
      firstName: {
        error: firstNameError,
        helperText: firstNameError
          ? 'First name must be at least 3 characters'
          : '',
      },
      lastName: {
        error: lastNameError,
        helperText: lastNameError
          ? 'Last name must be at least 3 characters'
          : '',
      },
    }

    setErrors({
      ...errors,
      invalidName: newErrors,
    } as Errors)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return

    const res = await updateUser({ ...user, name })

    if (res.isError) {
      setErrors({
        ...errors,
        invalidName: {
          ...errors?.invalidName,
          firstName: {
            error: true,
            helperText: res.helperText,
          },
        },
      } as Errors)
    } else {
      setUser({ ...user, name })
      setSuccess({ message: res.helperText, isActive: true })
    }
  }

  const handleChange = (value: string, inputId: string) =>
    setName((prev) => ({ ...prev, [inputId]: value }))

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      height='100%'
    >
      <Box display='flex' flexDirection='column' gap={2}>
        <BasicInput
          id='firstName'
          label='First Name'
          value={name.firstName}
          handleChange={(value) => handleChange(value, 'firstName')}
          error={firstName?.error}
          helperText={firstName?.helperText}
        />
        <BasicInput
          id='lastName'
          label='Last Name'
          value={name.lastName}
          handleChange={(value) => handleChange(value, 'lastName')}
          error={lastName?.error}
          helperText={lastName?.helperText}
        />
      </Box>
      <ButtonExtended disabled={firstName?.error || lastName?.error} />
    </Box>
  )
}

export default NamePage
