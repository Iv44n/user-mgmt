// src/components/Layout.tsx

import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import { useEffect } from 'react'
import { Alert, Backdrop } from '@mui/material'
import { useUserStore } from '../store/userStore'

type RouteTitles = {
  [key: string]: string
}

const Layout = () => {
  const location = useLocation()
  const success = useUserStore((state) => state.success)

  const routeTitles: RouteTitles = {
    '/': 'Login',
    '/home': 'Profile Settings',
    '/name': 'Name',
    '/username': 'User Name',
    '/email': 'Email',
    '/phoneNumber': 'Phone Number',
    '/changePassword': 'Change Password',
  }

  useEffect(() => {
    document.title = routeTitles[location.pathname] || 'Default Title'
  }, [location.pathname])

  return (
    <>
      <Header title={routeTitles[location.pathname]} />
      <main className='bg-blue-100/50 flex-auto border-y-2 border-gray-300 max-w-full p-4 h-full'>
        <Outlet />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={success.isActive}
        >
          <Alert
            severity='success'
            sx={{ position: 'absolute', bottom: '50%', width: '90%' }}
          >
            {success.message}
          </Alert>
        </Backdrop>
      </main>
    </>
  )
}

export default Layout
