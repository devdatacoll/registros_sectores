import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Registros from '../pages/Registros'
import Sectores from '../pages/Sectores'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/registros"
        element={
          <ProtectedRoute>
            <Registros />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sectores"
        element={
          <ProtectedRoute>
            <Sectores />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/registros" />} />
    </Routes>
  )
}

export default AppRoutes
