import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import '../styles/Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
    setMenuAbierto(false)
  }

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Registros</h2>
        </div>

        <button className="navbar-toggle" onClick={toggleMenu}>
          {menuAbierto ? '✕' : '☰'}
        </button>

        <div className={menuAbierto ? 'navbar-menu open' : 'navbar-menu'}>
          <Link
            to="/sectores"
            className={location.pathname === '/sectores' ? 'active' : ''}
            onClick={cerrarMenu}
          >
            Sectores
          </Link>
          <Link
            to="/registros"
            className={location.pathname === '/registros' ? 'active' : ''}
            onClick={cerrarMenu}
          >
            Registros
          </Link>

          {user && (
            <div className="navbar-user">
              {/* <span>👤 {user.username}</span> */}
              <button onClick={handleLogout} className="btn-logout">
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

// import { NavLink } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

// import '../styles/Navbar.css'

// export default function Navbar() {
//   const { logout } = useAuth()

//   return (
//     <nav className="nav">
//       <h1 className="nav_title">Title</h1>
//       <div className="nav_links">
//         <NavLink
//           className={({ isActive }) =>
//             'nav_link' + (isActive ? ' nav_link--active' : '')
//           }
//           to="/sectores"
//         >
//           Sectores
//         </NavLink>
//         <NavLink
//           className={({ isActive }) =>
//             'nav_link' + (isActive ? ' nav_link--active' : '')
//           }
//           to="/registros"
//         >
//           Registros
//         </NavLink>
//         <button className="nav_button" onClick={logout}>
//           Salir
//         </button>
//       </div>
//     </nav>
//   )
// }
