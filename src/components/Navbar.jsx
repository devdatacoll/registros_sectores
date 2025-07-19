import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import '../styles/Navbar.css'

export default function Navbar() {
  const { logout } = useAuth()

  return (
    <nav className="nav">
      <h1 className="nav_title">Title</h1>
      <div className="nav_links">
        <NavLink
          className={({ isActive }) =>
            'nav_link' + (isActive ? ' nav_link--active' : '')
          }
          to="/sectores"
        >
          Sectores
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            'nav_link' + (isActive ? ' nav_link--active' : '')
          }
          to="/registros"
        >
          Registros
        </NavLink>
        <button className="nav_button" onClick={logout}>
          Salir
        </button>
      </div>
    </nav>
  )
}
