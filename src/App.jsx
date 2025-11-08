import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'

import Navbar from './components/Navbar'

// Páginas
import Login from './pages/Login'
import Sectores from './pages/Sectores'
import Registros from './pages/Registros'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta raíz redirige a sectores */}
          <Route path="/" element={<Navigate to="/registros" replace />} />

          {/* Ruta pública - Login */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="/sectores"
            element={
              <ProtectedRoute>
                <Navbar />
                <Sectores />
              </ProtectedRoute>
            }
          />

          <Route
            path="/registros"
            element={
              <ProtectedRoute>
                <Navbar />
                <Registros />
              </ProtectedRoute>
            }
          />

          {/* Página 404 */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <h1>404 - Página no encontrada</h1>
                <a href="/sectores">Volver al inicio</a>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App



// import { useEffect } from 'react';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import AppRoutes from './routes/AppRoutes';
// import { useLocation } from 'react-router-dom';

// function App() {
//   const location = useLocation();
//   const hideNavbar = location.pathname === '/login';

//   /* ⏱️ Recarga automática cada 5 minutos
//   useEffect(() => {
//     const interval = setInterval(() => {
//       window.location.reload();
//     }, 5 * 60 * 1000); // 5 minutos en milisegundos

//     return () => clearInterval(interval); // Limpieza al desmontar
//   }, []);
//   */

//   return (
//     <AuthProvider>
//       {!hideNavbar && <Navbar />}
//       <AppRoutes />
//     </AuthProvider>
//   );
// }

// export default App;