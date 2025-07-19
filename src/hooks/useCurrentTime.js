import { useState, useEffect } from 'react'

const useCurrentTime = (interval = 60000) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, interval)

    return () => clearInterval(timer) // Limpiar al desmontar
  }, [interval])

  return now
}

export default useCurrentTime
