import { useEffect, useState } from 'react'

const useUserLocation = () => {
  const [locationData, setLocationData] = useState(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch('https://ipinfo.io/json?token=751068ba6da6f8')
        if (!res.ok) throw new Error('Failed to fetch location')
        const data = await res.json()
        setLocationData(data)
      } catch (err) {
        console.error('Location fetch error:', err)
      }
    }

    fetchLocation()
  }, [])

  return locationData
}

export default useUserLocation
