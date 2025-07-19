import { useState, useEffect } from 'react'

import Clock from '../components/Clock'
import ApplicationsTable from '../components/ApplicationsTable'
import useCurrentTime from '../hooks/useCurrentTime'

import '../styles/Registros.css'

function Registros() {
  const [asignados, setAsignados] = useState([])

  useEffect(() => {
    const obtenerAsignados = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/asignados`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        })

        if (!res.ok) throw new Error('Error al obtener asignados')

        const data = await res.json()
        setAsignados(data)
      } catch (error) {
        console.error('❌ Error:', error.message)
      }
    }

    obtenerAsignados()
  }, [])

  const now = useCurrentTime()

  return (
    <>
      <div className="table-container">
        <h2>Registros de aplicaciones v01</h2>
        <Clock />
        <ApplicationsTable asignados={asignados} now={now} />
      </div>
    </>
  )
}

export default Registros
