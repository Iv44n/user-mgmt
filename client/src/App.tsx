import { useEffect } from 'react'
import { useUserStore } from './store/userStore'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NamePage from './pages/Name'
import UserNamePage from './pages/Username'
import PasswordPage from './pages/Password'
import Layout from './components/Layout'

function App() {
  const { user, getUser } = useUserStore()

  useEffect(() => {
    const id = '66bf92eaa86bb31a4cc3611e'
    getUser(id)
  }, [])

  if (!user) return <div>Loading...</div>

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='name' element={<NamePage />} />
            <Route path='username' element={<UserNamePage />} />
            <Route path='changePassword' element={<PasswordPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
