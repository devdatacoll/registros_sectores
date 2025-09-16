import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('auth')
  )
  const navigate = useNavigate()

  const login = (username, password) => {
    if (username === 'admin' && password === '1234qwe') {
      localStorage.setItem('auth', 'true')
      setIsAuthenticated(true)
      navigate('/registros')
    }
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setIsAuthenticated(false)
    navigate('/login')
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
