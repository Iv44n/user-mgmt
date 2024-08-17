import { TextField, Box } from '@mui/material'
import { useUserStore } from '../store/userStore'
import { FormEvent, useEffect, useState } from 'react'
import { Errors } from '../types/user'
import ButtonExtended from '../components/Button'

function UserNamePage() {
  const { user, setUser, updateUser, errors, setErrors, setSuccess } =
    useUserStore()
  const [username, setUsername] = useState(user?.username || '')

  const { invalidUserName } = errors || {}

  useEffect(() => {
    const newErrors = {
      invalidUserName: {
        error: username.length < 3,
        helperText:
          username.length < 3 ? 'Username must be at least 3 characters' : '',
      },
    }

    setErrors({
      ...errors,
      invalidUserName: newErrors.invalidUserName,
    } as Errors)
  }, [username])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return

    const res = await updateUser({ ...user, username })


    if (res.isError && res.statusText === 'ERROR') {
      setErrors({
        ...errors,
        invalidUserName: {
          ...errors?.invalidUserName,
          error: true,
          helperText: res.helperText,
        },
      } as Errors)
    }

    if (!res.isError && res.statusText === 'OK') {
      setUser({ ...user, username })
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
      <TextField
        id='username'
        label='Username'
        variant='outlined'
        className='bg-white'
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={invalidUserName?.error}
        helperText={invalidUserName?.helperText}
      />
      <ButtonExtended disabled={!username || invalidUserName?.error} />
    </Box>
  )
}

export default UserNamePage
