import { calcularEstado, formatoFecha } from '../utils/dateUtils'

export default function ApplicationsTable({ asignados, now }) {
  return (
    <table className="sector-table">
      <thead>
        <tr>
          <th>Fecha programada</th>
          <th>Campo</th>
          <th>Sector</th>
          <th>Fecha/Hora Inicio</th>
          <th>Fecha/Hora Término</th>
          <th>Horas Reingreso</th>
          <th>Fecha/Hora Reingreso</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {asignados.map((registro, index) => {
          console.log(registro)
          const estado = calcularEstado(registro.horareingresoestimada, now, registro.estado)

          return (
            <tr key={index}>
              <td>{registro.dia_panificada}</td>
              <td>{registro.campo}</td>
              <td>{registro.sector}</td>
              <td>
                {registro.hora_inicio ? formatoFecha(registro.hora_inicio) : ''}
              </td>
              <td>
                {registro.hora_termino
                  ? formatoFecha(registro.hora_termino)
                  : ''}
              </td>
              <td>{registro.horas_reingreso}</td>
              <td>
                {registro.horareingresoestimada 
                  ? (
                  <>
                    <span role="img" aria-label="reloj"> 🕒 </span>{' '} {formatoFecha(registro.horareingresoestimada)}
                  </>
                  ) 
                  : (
                  '-'
                  )
                }
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
  )
}
