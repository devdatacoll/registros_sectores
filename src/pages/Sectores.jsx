import { useEffect, useRef, useState } from 'react'
import SectorSearch from '../components/SectorSearch'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../styles/Sectores.css'

export default function Sectores() {
  const mapRef = useRef(null) // referencia al objeto Leaflet.Map
  const mapContainerRef = useRef(null) // referencia al <div id="map">
  const capaKMLActual = useRef(null)

  const [mapaActivo, setMapaActivo] = useState('LV')
  const [busqueda, setBusqueda] = useState('')
  const [sectorIndex, setSectorIndex] = useState({})
  const [layerIndex, setLayerIndex] = useState({})
  const [mostrarEtiquetas, setMostrarEtiquetas] = useState(true)

  const cargarMapa = (archivo) => {
    if (!mapRef.current) return

    if (capaKMLActual.current) {
      mapRef.current.removeLayer(capaKMLActual.current)
    }

    const nuevaCapa = window.omnivore.kml(archivo).on('ready', function () {
      mapRef.current.fitBounds(nuevaCapa.getBounds())

      const nuevosSectores = {}
      const nuevasCapas = {}

      nuevaCapa.eachLayer((layer) => {
        const nombre = layer.feature?.properties?.name
        if (nombre) {
          const lower = nombre.toLowerCase()
          const centro = layer.getBounds().getCenter()
          nuevosSectores[lower] = centro
          nuevasCapas[lower] = layer

          layer.setStyle({ color: '#3388ff', weight: 2, fillOpacity: 0.3 })
          layer.bindPopup(`<strong>${nombre}</strong>`)

          L.marker(centro, { opacity: 0 })
            .addTo(mapRef.current)
            .bindTooltip(nombre, {
              permanent: mostrarEtiquetas,
              direction: 'center',
              className: 'etiqueta-sector',
            })
        }
      })

      setSectorIndex(nuevosSectores)
      setLayerIndex(nuevasCapas)
    })

    capaKMLActual.current = nuevaCapa
    nuevaCapa.addTo(mapRef.current)
  }

  useEffect(() => {
    if (mapRef.current) return // ya inicializado

    const map = L.map(mapContainerRef.current).setView([-18.363, -70.299], 15)
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    cargarMapa('/maps/Sectores_AZ_LV.kml')

    map.locate({ setView: true, maxZoom: 16 })
    map.on('locationfound', (e) => {
      L.circleMarker(e.latlng, {
        radius: 8,
        fillColor: '#136AEC',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .addTo(map)
        .bindPopup('Estás aquí')
        .openPopup()
    })

    map.on('locationerror', (e) => {
      alert('No se pudo obtener tu ubicación: ' + e.message)
    })
  }, [])

  const handleBuscar = (e) => {
    if (e.key === 'Enter') {
      const nombre = busqueda.toLowerCase()
      let encontrado = false

      Object.keys(layerIndex).forEach((key) => {
        const layer = layerIndex[key]
        layer.setStyle({ color: '#3388ff', weight: 2, fillOpacity: 0.3 })

        if (key === nombre) {
          const centro = sectorIndex[key]
          mapRef.current.setView(centro, 17)
          layer.openPopup()
          layer.setStyle({ color: 'red', weight: 3, fillOpacity: 0.6 })
          setMostrarEtiquetas(false)
          encontrado = true
        }
      })

      if (!encontrado) {
        alert('⚠️ Sector no encontrado')
      }
    }
  }

  return (
    <>
      <div className="field_contender">
        <h2>Sectores</h2>

        <SectorSearch
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          handleBuscar={handleBuscar}
        />

        <div className="mapas">
          <button
            className={`btn_lv ${mapaActivo === 'LV' ? 'activo' : ''}`}
            onClick={() => {
              cargarMapa('/maps/Sectores_AZ_LV.kml')
              setMapaActivo('LV')
            }}
          >
            LV
          </button>
          <button
            className={`btn_cc ${mapaActivo === 'CC' ? 'activo' : ''}`}
            onClick={() => {
              cargarMapa('/maps/Sectores_AZ_CC.kml')
              setMapaActivo('CC')
            }}
          >
            CC
          </button>
        </div>

        <div id="map" style={{ height: '80vh' }} ref={mapContainerRef}></div>
      </div>
    </>
  )
}
