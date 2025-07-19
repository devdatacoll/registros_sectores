# 📍 Registros y Sectores

Aplicación web construida con **React + Vite + Leaflet**, que permite visualizar sectores agrícolas en un mapa, buscar sectores específicos y cargar distintas capas desde archivos KML.

---

## 🚀 Tecnologías

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Leaflet](https://leafletjs.com/)
- [Leaflet Omnivore](https://github.com/mapbox/leaflet-omnivore)
- [React Router DOM](https://reactrouter.com/)
- HTML, CSS (con estructura modular)

---

## 📂 Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables (Navbar, MapSelector, etc.)
├── context/          # AuthContext para manejo de sesión
├── hooks/            # Hooks personalizados
├── pages/            # Páginas: Login, Registros, Sectores
├── routes/           # Rutas protegidas
├── styles/           # Archivos CSS
public/
└── maps/             # Archivos .kml para capas del mapa
```