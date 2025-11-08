import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const PublicRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <h2>Cargando...</h2>
      </div>
    )
  }

  if (isAuthenticated()) {
    return <Navigate to="/registros" replace />
  }

  return children
}