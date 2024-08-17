import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NamePage from './pages/Name'
import UserNamePage from './pages/Username'
import PasswordPage from './pages/Password'
import Layout from './components/Layout'
import Login from './pages/Login'
import { useUserStore } from './store/userStore'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const user = useUserStore((state) => state.user)

  return user ? children : <Navigate to='/' />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route
            path='home'
            element={<PrivateRoute>{<Home />}</PrivateRoute>}
          />
          <Route
            path='name'
            element={<PrivateRoute>{<NamePage />}</PrivateRoute>}
          />
          <Route
            path='username'
            element={<PrivateRoute>{<UserNamePage />}</PrivateRoute>}
          />
          <Route
            path='changePassword'
            element={<PrivateRoute>{<PasswordPage />}</PrivateRoute>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
