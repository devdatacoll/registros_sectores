import { useEffect, useState } from 'react'
import '../styles/Clock.css'

const Clock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(intervalId)
  }, [])

  const formattedTime = time.toLocaleTimeString()

  return <div className="clock">🕒 {formattedTime}</div>
}

export default Clock
