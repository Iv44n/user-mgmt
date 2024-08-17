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
  const { firstName, lastName } = errors?.invalidName || {}

  useEffect(() => {
    const firstNameLength = name.firstName.length
    const lastNameLength = name.lastName.length

    const newErrors = {
      firstName: {
        error: firstNameLength < 3,
        helperText:
          firstNameLength < 3 ? 'First name must be at least 3 characters' : '',
      },
      lastName: {
        error: lastNameLength < 3,
        helperText:
          lastNameLength < 3 ? 'Last name must be at least 3 characters' : '',
      },
    }

    setErrors({
      ...errors,
      invalidName: newErrors,
    } as Errors)
  }, [name])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return
    const res = await updateUser({ ...user, name })

    if (res.isError && res.statusText === 'ERROR') {
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
    }

    if (!res.isError && res.statusText === 'OK') {
      setUser({ ...user, name })
      setSuccess({ message: res.helperText, isActive: true })
    }
  }

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
          id='first-name'
          label='First Name'
          value={name.firstName}
          handleChange={(value) =>
            setName((prev) => ({ ...prev, firstName: value }))
          }
          error={firstName?.error}
          helperText={firstName?.helperText}
        />
        <BasicInput
          id='last-name'
          label='Last Name'
          value={name.lastName}
          handleChange={(value) =>
            setName((prev) => ({ ...prev, lastName: value }))
          }
          error={lastName?.error}
          helperText={lastName?.helperText}
        />
      </Box>
      <ButtonExtended disabled={firstName?.error || lastName?.error} />
    </Box>
  )
}

export default NamePage
