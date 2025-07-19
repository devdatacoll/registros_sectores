// src/App.jsx
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;