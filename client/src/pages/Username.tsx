import { Button, TextField, Box } from '@mui/material'
import { useUserStore } from '../store/userStore'
import { FormEvent, useState } from 'react'
import { validateName } from '../utils/validateForm'

function UserNamePage() {
  const { user, updateUser } = useUserStore()
  const [username, setUsername] = useState(user?.username || '')

  const usernameError = validateName(username)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (user) {
      await updateUser({ ...user, username })
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
        error={usernameError.hasError}
        helperText={usernameError.helperText}
      />
      <Button
        disabled={!username || usernameError.hasError}
        type='submit'
        variant='contained'
      >
        Save
      </Button>
    </Box>
  )
}

export default UserNamePage
