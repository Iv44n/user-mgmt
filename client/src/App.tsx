import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from './pages/Home'
import NamePage from './pages/Name'
import UserNamePage from './pages/Username'
import PasswordPage from './pages/Password'
import Layout from './components/Layout'
import Login from './pages/Login'
import { useUserStore } from './store/userStore'

function App() {
  const user = useUserStore((state) => state.user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='home' element={user ? <Home /> : <Navigate to='/' />} />
          <Route
            path='name'
            element={user ? <NamePage /> : <Navigate to='/' />}
          />
          <Route
            path='username'
            element={user ? <UserNamePage /> : <Navigate to='/' />}
          />
          <Route
            path='changePassword'
            element={user ? <PasswordPage /> : <Navigate to='/' />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
