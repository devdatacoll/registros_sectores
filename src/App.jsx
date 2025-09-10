import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  /* ⏱️ Recarga automática cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 5 * 60 * 1000); // 5 minutos en milisegundos

    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);
  */

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;