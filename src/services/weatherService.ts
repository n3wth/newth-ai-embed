// Weather data types
export interface WeatherData {
  city: string
  daily: WeatherDay[]
}

export interface WeatherDay {
  date: string
  condition: string
  tempMin: number
  tempMax: number
  precipitation: number
}

// Weather API calls are now handled securely through our backend API
// No API keys are exposed to the client

// Helper functions moved to backend API for security

async function fetchWeatherFromAPI(city: string): Promise<WeatherData> {
  try {
    // Call our secure backend API instead of directly calling OpenWeather
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    const data: WeatherData = await response.json()
    return data
  } catch (error) {
    console.error(`Failed to fetch weather for ${city}:`, error)
    throw new Error(
      `Failed to fetch weather data for ${city}: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

// Fallback mock data in case API fails - generates current dates
function generateMockWeatherData(city: string): WeatherData {
  const today = new Date()
  const daily: WeatherDay[] = []

  // Base weather patterns for each city
  const cityPatterns = {
    Hanoi: {
      tempBase: 25,
      tempVariation: 8,
      conditions: ['Partly cloudy', 'Sunny', 'Light rain', 'Cloudy', 'Overcast clouds'],
    },
    'Ho Chi Minh City': {
      tempBase: 30,
      tempVariation: 6,
      conditions: ['Sunny', 'Partly cloudy', 'Thunderstorms', 'Heavy rain', 'Clear sky'],
    },
    'Ha Long Bay': {
      tempBase: 22,
      tempVariation: 7,
      conditions: ['Foggy', 'Partly cloudy', 'Light rain', 'Cloudy', 'Mist'],
    },
    'San Francisco': {
      tempBase: 18,
      tempVariation: 6,
      conditions: ['Foggy', 'Partly cloudy', 'Clear sky', 'Overcast clouds', 'Light rain'],
    },
  }

  const pattern = cityPatterns[city as keyof typeof cityPatterns] || cityPatterns['Hanoi']

  for (let i = 0; i < 10; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    // Generate realistic temperatures with some variation
    const tempVariation = (Math.random() - 0.5) * pattern.tempVariation
    const tempMax = Math.round(pattern.tempBase + tempVariation + Math.random() * 5)
    const tempMin = Math.round(tempMax - 5 - Math.random() * 3)

    // Pick a random condition
    const condition = pattern.conditions[Math.floor(Math.random() * pattern.conditions.length)]!

    // Generate precipitation based on condition
    let precipitation = 0
    if (condition.toLowerCase().includes('rain')) {
      precipitation = Math.round(Math.random() * 15 + 2)
    } else if (condition.toLowerCase().includes('thunder')) {
      precipitation = Math.round(Math.random() * 25 + 10)
    }

    daily.push({
      date: date.toISOString().split('T')[0]!,
      tempMin,
      tempMax,
      condition,
      precipitation,
    })
  }

  return {
    city,
    daily,
  }
}

export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    // Try to fetch from OpenWeatherMap API first
    return await fetchWeatherFromAPI(city)
  } catch (error) {
    console.warn(`API fetch failed for ${city}, falling back to mock data:`, error)

    // Fall back to mock data if API fails
    const mockData = generateMockWeatherData(city)

    // Add a small delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockData
  }
}
