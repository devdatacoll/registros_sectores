export const calcularEstado = (horaTermino, now) => {
  if (!horaTermino) {
    return 'Pendiente'
  }

  const fecha1 = new Date(now)
  const fecha2 = new Date(horaTermino)

  return fecha1 >= fecha2 ? 'Disponible' : 'Bloqueado'
}

export const formatoFecha = (fechaOriginal) => {
  const fecha = new Date(fechaOriginal)

  // Formateamos los componentes
  const dia = fecha.getDate().toString().padStart(2, '0')
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0') // ¡meses son 0-indexados!
  const anio = fecha.getFullYear()

  const horas = fecha.getHours().toString().padStart(2, '0')
  const minutos = fecha.getMinutes().toString().padStart(2, '0')

  // Resultado final
  const formatoPersonalizado = `${dia}/${mes}/${anio} ${horas}:${minutos}`

  return formatoPersonalizado
}
