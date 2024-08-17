import {
  Container,
  TextField,
  Button,
  Paper,
  Box,
  Typography,
} from '@mui/material'
import { useUserStore } from '../store/userStore'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const login = useUserStore((state) => state.login)
  const setUser = useUserStore((state) => state.setUser)
  const [userData, setUserData] = useState({
    username: 'admin',
    password: 'admin',
  })
  const navigate = useNavigate()

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    const res = await login(userData.username, userData.password)
    
    if (res) {
      setUser(res)
      navigate('/home')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box component='form' sx={{ mt: 1 }} onSubmit={handleLogin}>
          <TextField
            margin='normal'
            required
            fullWidth
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            autoComplete='current-password'
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='success'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography variant='body2' align='center'>
            Don't have an account?
            <Button variant='text' color='success'>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
