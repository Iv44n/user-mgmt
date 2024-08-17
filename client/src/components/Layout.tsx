// src/components/Layout.tsx

import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import { useEffect } from 'react'

type RouteTitles = {
  [key: string]: string
}

const Layout = () => {
  const location = useLocation()

  const routeTitles: RouteTitles = {
    '/': 'Profile Settings',
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
      </main>
    </>
  )
}

export default Layout
