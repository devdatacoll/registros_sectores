// ApplicationsTable.jsx - Versión responsive con cards y ordenamiento por estado
import { useState, useEffect, useMemo } from 'react'
import { calcularEstado, formatoFecha } from '../utils/dateUtils'

export default function ApplicationsTable({ asignados, now }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // 🎯 ORDENAR REGISTROS POR ESTADO (optimizado con useMemo)
  const registrosOrdenados = useMemo(() => {
    // Orden de prioridad de estados
    const ordenEstados = {
      'bloqueado': 1,
      'iniciado': 2,
      'pendiente': 3,
      'disponible': 4,
      'completado': 5
    }

    return [...asignados].sort((a, b) => {
      // Calcular estados
      const estadoA = calcularEstado(a.horareingresoestimada, now, a.estado)
      const estadoB = calcularEstado(b.horareingresoestimada, now, b.estado)
      
      // Obtener prioridades
      const prioridadA = ordenEstados[estadoA.toLowerCase()] || 999
      const prioridadB = ordenEstados[estadoB.toLowerCase()] || 999
      
      // Si tienen diferente prioridad, ordenar por prioridad
      if (prioridadA !== prioridadB) {
        return prioridadA - prioridadB
      }
      
      // Si tienen la misma prioridad, ordenar por fecha de reingreso (más próximos primero)
      if (a.horareingresoestimada && b.horareingresoestimada) {
        return new Date(a.horareingresoestimada) - new Date(b.horareingresoestimada)
      }
      
      // Los que tienen fecha de reingreso van primero
      if (a.horareingresoestimada) return -1
      if (b.horareingresoestimada) return 1
      
      return 0
    })
  }, [asignados, now])

  // Vista de cards para móviles
  if (isMobile) {
    return (
      <div className="cards-container">
        {registrosOrdenados.map((registro, index) => {
          const estado = calcularEstado(
            registro.horareingresoestimada,
            now,
            registro.estado
          )
          return (
            <div key={index} className="registro-card">
              <div className="card-header">
                <div className="card-title">
                  <strong>{registro.campo}</strong> - {registro.sector}
                </div>
                <span className={`estado-tag ${estado.toLowerCase()}`}>
                  {estado}
                </span>
              </div>

              <div className="card-body">
                <div className="card-row">
                  <span className="card-label">🚜 Tipo:</span>
                  <span className="card-value">{registro.tipo}</span>
                </div>

                <div className="card-row">
                  <span className="card-label">📅 Programada:</span>
                  <span className="card-value">{registro.dia_panificada}</span>
                </div>

                {registro.hora_inicio && (
                  <div className="card-row">
                    <span className="card-label">▶️ Inicio:</span>
                    <span className="card-value">
                      {formatoFecha(registro.hora_inicio)}
                    </span>
                  </div>
                )}

                {registro.hora_termino && (
                  <div className="card-row">
                    <span className="card-label">⏹️ Término:</span>
                    <span className="card-value">
                      {formatoFecha(registro.hora_termino)}
                    </span>
                  </div>
                )}

                {registro.horareingresoestimada && (
                  <div className="card-row highlight">
                    <span className="card-label">🕒 Reingreso:</span>
                    <span className="card-value">
                      {formatoFecha(registro.horareingresoestimada)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Vista de tabla para desktop/tablet
  return (
    <div className="table-wrapper">
      <table className="sector-table">
        <thead>
          <tr>
            <th>Fecha programada</th>
            <th>Campo</th>
            <th>Sector</th>
            <th>Tipo</th>
            <th>Fecha/Hora Inicio</th>
            <th>Fecha/Hora Término</th>
            <th>Horas Reingreso</th>
            <th>Fecha/Hora Reingreso</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {registrosOrdenados.map((registro, index) => {
            const estado = calcularEstado(
              registro.horareingresoestimada,
              now,
              registro.estado
            )
            return (
              <tr key={index}>
                <td>{registro.dia_panificada}</td>
                <td>{registro.campo}</td>
                <td>{registro.sector}</td>
                <td>{registro.tipo}</td>
                <td>
                  {registro.hora_inicio
                    ? formatoFecha(registro.hora_inicio)
                    : ''}
                </td>
                <td>
                  {registro.hora_termino
                    ? formatoFecha(registro.hora_termino)
                    : ''}
                </td>
                <td>{registro.horas_reingreso}</td>
                <td>
                  {registro.horareingresoestimada ? (
                    <>
                      <span role="img" aria-label="reloj">
                        {' '}
                        🕒{' '}
                      </span>{' '}
                      {formatoFecha(registro.horareingresoestimada)}
                    </>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  <span className={`estado-tag ${estado.toLowerCase()}`}>
                    {estado}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}


// import { calcularEstado, formatoFecha } from '../utils/dateUtils'

// export default function ApplicationsTable({ asignados, now }) {
//   return (
//     <table className="sector-table">
//       <thead>
//         <tr>
//           <th>Fecha programada</th>
//           <th>Campo</th>
//           <th>Sector</th>
//           <th>Tipo</th>
//           <th>Fecha/Hora Inicio</th>
//           <th>Fecha/Hora Término</th>
//           <th>Horas Reingreso</th>
//           <th>Fecha/Hora Reingreso</th>
//           <th>Estado</th>
//         </tr>
//       </thead>
//       <tbody>
//         {asignados.map((registro, index) => {
//           const estado = calcularEstado(registro.horareingresoestimada, now, registro.estado)
//           return (
//             <tr key={index}>
//               <td>{registro.dia_panificada}</td>
//               <td>{registro.campo}</td>
//               <td>{registro.sector}</td>
//               <td>{registro.tipo}</td>
//               <td>
//                 {registro.hora_inicio ? formatoFecha(registro.hora_inicio) : ''}
//               </td>
//               <td>
//                 {registro.hora_termino
//                   ? formatoFecha(registro.hora_termino)
//                   : ''}
//               </td>
//               <td>{registro.horas_reingreso}</td>
//               <td>
//                 {registro.horareingresoestimada 
//                   ? (
//                   <>
//                     <span role="img" aria-label="reloj"> 🕒 </span>{' '} {formatoFecha(registro.horareingresoestimada)}
//                   </>
//                   ) 
//                   : (
//                   '-'
//                   )
//                 }
//               </td>
//               <td>
//                 <span className={`estado-tag ${estado.toLowerCase()}`}>
//                   {estado}
//                 </span>
//               </td>
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   )
// }
