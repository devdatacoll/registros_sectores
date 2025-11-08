import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../data/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        checkSessionExpiration()
      }
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [user])

  const checkSession = () => {
    try {
      const savedUser = localStorage.getItem('auth_user')

      if (savedUser) {
        const userData = JSON.parse(savedUser)
        const expiresAt = new Date(userData.session_expires_at)

        if (expiresAt > new Date()) {
          setUser(userData)
        } else {
          logout()
        }
      }
    } catch (error) {
      console.error('Error al verificar sesión:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const checkSessionExpiration = () => {
    if (!user) return

    const expiresAt = new Date(user.session_expires_at)

    if (expiresAt <= new Date()) {
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.')
      logout()
    }
  }

  // src/context/AuthContext.jsx
  const login = async (username, password) => {
    try {
      const { data, error } = await supabase.rpc('login_user', {
        p_username: username,
        p_password: password,
      })

      if (error) throw error

      console.log('Respuesta de login:', data) // Para debugging

      if (data && data.length > 0 && data[0].success) {
        const userData = {
          id: data[0].user_id, // ← Cambio aquí
          username: data[0].user_username, // ← Cambio aquí
          session_expires_at: data[0].user_session_expires_at, // ← Cambio aquí
        }

        localStorage.setItem('auth_user', JSON.stringify(userData))
        setUser(userData)

        return { success: true }
      } else {
        return { success: false, error: 'Usuario o contraseña incorrectos' }
      }
    } catch (error) {
      console.error('Error en login:', error)
      return { success: false, error: 'Error al iniciar sesión' }
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_user')
    setUser(null)
  }

  const isAuthenticated = () => {
    if (!user) return false

    const expiresAt = new Date(user.session_expires_at)
    return expiresAt > new Date()
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


// import { createContext, useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     () => !!localStorage.getItem('auth')
//   )
//   const navigate = useNavigate()

//   const login = (username, password) => {
//     if (username === 'admin' && password === '1234qwe') {
//       localStorage.setItem('auth', 'true')
//       setIsAuthenticated(true)
//       navigate('/registros')
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem('auth')
//     setIsAuthenticated(false)
//     navigate('/login')
//   }

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login')
//     }
//   }, [isAuthenticated, navigate])

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)
