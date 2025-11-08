import { useState, useEffect } from 'react'

import Clock from '../components/Clock'
import ApplicationsTable from '../components/ApplicationsTable'
import useCurrentTime from '../hooks/useCurrentTime'

import { supabase } from '../data/supabaseClient'

import '../styles/Registros.css'

function Registros() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        const { data, error } = await supabase
          .from('view_asignados_today')
          .select('*')

        if (error) throw error

        setData(data)
        setLastUpdate(new Date())
        setError(null)
      } catch (err) {
        console.error('Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    // Cargar datos inicialmente
    fetchData()

    // Actualizar cada 2 minutos
    const interval = setInterval(fetchData, 120000)

    // Cleanup
    return () => clearInterval(interval)
  }, [])

  const now = useCurrentTime()

  if (loading && !data.length) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>
  //------

  return (
    <>
      <div className="table-container">
        <h2 className="table-title">Registros de aplicaciones</h2>
        {/* <p>{lastUpdate}</p> */}
        <Clock />
        <ApplicationsTable asignados={data} now={now} />
      </div>
    </>
  )
}

export default Registros


// import { useState, useEffect } from 'react'

// import Clock from '../components/Clock'
// import ApplicationsTable from '../components/ApplicationsTable'
// import useCurrentTime from '../hooks/useCurrentTime'

// import { supabase } from '../data/supabaseClient'

// import '../styles/Registros.css'

// function Registros() {
//   /*
//   const [asignados, setAsignados] = useState([])

//   useEffect(() => {
//     const obtenerAsignados = async () => {
//       try {
//         //const res = await fetch(`${import.meta.env.VITE_API_URL}/asignados`, {
//         const res = await fetch(`${import.meta.env.VITE_API_URL}/asignados/today`, {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
//           },
//         })

//         if (!res.ok) throw new Error('Error al obtener asignados')

//         const data = await res.json()
//         setAsignados(data)
//       } catch (error) {
//         console.error('❌ Error:', error.message)
//       }
//     }

//     obtenerAsignados()
//   }, [])

//   */
//   //-----
//   //const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
//   //const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

//   //const supabase = createClient(supabaseUrl, supabaseKey)
//   /*
//   const supabase = createClient(
//     process.env.VITE_SUPABASE_URL,
//     process.env.VITE_SUPABASE_ANON_KEY
//   )
// */
//   //---------------
// /*
//   useEffect(() => {
//     fetchData()
//   }, [])

//   async function fetchData() {
//     try {
//       const { data, error } = await supabase
//         .from('view_asignados_today')
//         .select('*')
      
//       if (error) throw error
//       setData(data)
//     } catch (error) {
//       console.error('Error:', error.message)
//     } finally {
//       setLoading(false)
//     }
//   }
// */
// /*
//   const obtenerDatos = async () => {
//     const { data, error } = await supabase
//       .from("view_asignados_today") // Nombre exacto de la tabla
//       .select("*") // Todas las columnas

//     if (error) {
//       console.error("Error al obtener datos:", error)
//     } else {
//       setDatos(data)
//       //console.log("Datos obtenidos:", data)
//     }
//   }

//   useEffect(() => {
//     obtenerDatos()
//   }, [])
// */
//   //---------------


//   // const [asignados, setAsignados] = useState([])

//   // const obtenerAsignados = async () => {
//   //   try {
//   //     const res = await fetch(`${import.meta.env.VITE_API_URL}/asignados/today`, {
//   //       headers: {
//   //         Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
//   //       },
//   //     });

//   //     if (!res.ok) throw new Error('Error al obtener asignados')

//   //     const data = await res.json()
//   //     setAsignados(data)
//   //   } catch (error) {
//   //     console.error('❌ Error:', error.message)
//   //   }
//   // }

//   // useEffect(() => {
//   //   obtenerAsignados(); // Llamada inicial

//   //   const intervalo = setInterval(() => {
//   //     obtenerAsignados(); // Llamada cada 5 minutos
//   //   }, 1 * 300 * 1000);

//   //   return () => clearInterval(intervalo); // Limpieza al desmontar
//   // }, []);

//   const [data, setData] = useState([])

//   useEffect(() => {
//     async function fetchData() {
//       const { data, error } = await supabase
//         .from('view_asignados_today')
//         .select('*')

//       if (error) console.error('Error:', error)
//       else setData(data)
//     }

//     fetchData()
//   }, [])

//   const now = useCurrentTime();

//   //------

//   return (
//     <>
//       <div className="table-container">
//         <h2>Registros de aplicaciones v01</h2>
//         <Clock />
//         <ApplicationsTable asignados={data} now={now} />
//       </div>
//     </>
//   )
// }

// export default Registros
