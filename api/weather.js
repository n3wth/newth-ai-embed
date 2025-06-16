// Vercel serverless function for weather data
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { city } = req.query

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' })
  }

  // API key is stored as environment variable on Vercel (not exposed to client)
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

  if (!OPENWEATHER_API_KEY) {
    return res.status(500).json({ error: 'Weather service not configured' })
  }

  const CITY_COORDINATES = {
    Hanoi: { lat: 21.0285, lon: 105.8542 },
    'Ho Chi Minh City': { lat: 10.8231, lon: 106.6297 },
    'Ha Long Bay': { lat: 20.9101, lon: 107.1839 },
    'San Francisco': { lat: 37.7749, lon: -122.4194 },
  }

  const coordinates = CITY_COORDINATES[city]
  if (!coordinates) {
    return res.status(400).json({ error: `Coordinates not found for city: ${city}` })
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${OPENWEATHER_API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`)
    }

    const data = await response.json()

    // Process the data (same logic as your current service)
    const dailyData = {}

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0]
      const tempMin = Math.round(item.main.temp_min - 273.15)
      const tempMax = Math.round(item.main.temp_max - 273.15)
      const condition =
        item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)
      const precipitation = Math.round((item.rain?.['3h'] || 0) + (item.snow?.['3h'] || 0))

      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          tempMin,
          tempMax,
          conditions: [condition],
          precipitation,
        }
      } else {
        dailyData[date].tempMin = Math.min(dailyData[date].tempMin, tempMin)
        dailyData[date].tempMax = Math.max(dailyData[date].tempMax, tempMax)
        if (!dailyData[date].conditions.includes(condition)) {
          dailyData[date].conditions.push(condition)
        }
        dailyData[date].precipitation = Math.max(dailyData[date].precipitation, precipitation)
      }
    })

    const daily = Object.values(dailyData)
      .slice(0, 10)
      .map((day) => ({
        date: day.date,
        tempMin: day.tempMin,
        tempMax: day.tempMax,
        condition: day.conditions[0],
        precipitation: day.precipitation,
      }))

    return res.status(200).json({
      city,
      daily,
    })
  } catch (error) {
    console.error('Weather API error:', error)
    return res.status(500).json({ error: 'Failed to fetch weather data' })
  }
}
