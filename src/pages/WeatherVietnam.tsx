import { useEffect, useState } from 'react'
import { getWeatherData } from '../services/weatherService'
import type { WeatherData, WeatherDay } from '../services/weatherService'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sun,
  CloudRain,
  Cloud,
  CloudSun,
  CloudLightning,
  CloudDrizzle,
  CloudSnow,
  CloudFog,
  CloudHail,
  CloudMoon,
  CloudSunRain,
  MapPin,
  Calendar,
} from 'lucide-react'
import { cn } from '@/lib/utils'

function getWeatherIcon(condition: string) {
  const c = condition.toLowerCase()
  if (c.includes('thunder')) return <CloudLightning className="w-4 h-4 text-yellow-600" />
  if (c.includes('rain') && c.includes('heavy'))
    return <CloudRain className="w-4 h-4 text-blue-600" />
  if (c.includes('rain')) return <CloudDrizzle className="w-4 h-4 text-blue-500" />
  if (c.includes('cloud') && c.includes('partly'))
    return <CloudSun className="w-4 h-4 text-orange-500" />
  if (c.includes('cloud')) return <Cloud className="w-4 h-4 text-gray-500" />
  if (c.includes('sun')) return <Sun className="w-4 h-4 text-yellow-500" />
  if (c.includes('fog')) return <CloudFog className="w-4 h-4 text-gray-400" />
  if (c.includes('hail')) return <CloudHail className="w-4 h-4 text-blue-400" />
  if (c.includes('snow')) return <CloudSnow className="w-4 h-4 text-blue-300" />
  if (c.includes('moon')) return <CloudMoon className="w-4 h-4 text-indigo-400" />
  return <CloudSunRain className="w-4 h-4 text-blue-500" />
}

interface CityWeatherTableProps {
  city: string
  maxHeight?: number | string
  showHeader?: boolean
}

function CityWeatherTable({ city, maxHeight, showHeader = true }: CityWeatherTableProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true)
      try {
        setWeather(await getWeatherData(city))
      } catch {
        setWeather(null)
      }
      setLoading(false)
    }
    fetchWeather()
  }, [city])

  if (loading) {
    return (
      <Card className="h-[400px]">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading weather data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) {
    return (
      <Card className="h-[400px]">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-destructive">Failed to load weather data</p>
            <p className="text-xs text-muted-foreground">Please try again later</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      {showHeader && (
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            {city}
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className={cn('p-0', showHeader && 'pt-0')}>
        <div
          className="overflow-auto"
          style={
            maxHeight
              ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }
              : {}
          }
        >
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="text-xs font-medium text-muted-foreground w-20">
                  Day
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground w-12"></TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Condition
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-muted-foreground w-16">
                  Min
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-muted-foreground w-16">
                  Max
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-muted-foreground w-16">
                  Rain
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weather.daily.slice(0, 10).map((day: WeatherDay, i: number) => (
                <TableRow
                  key={i}
                  className={cn(
                    'border-b border-border/50 hover:bg-muted/50 transition-colors',
                    i === 0 && 'bg-muted/30'
                  )}
                >
                  <TableCell className="text-xs font-medium">
                    {i === 0 ? (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Today
                      </div>
                    ) : (
                      new Date(day.date).toLocaleDateString('en', {
                        month: 'short',
                        day: 'numeric',
                      })
                    )}
                  </TableCell>
                  <TableCell className="text-center">{getWeatherIcon(day.condition)}</TableCell>
                  <TableCell className="text-xs capitalize text-muted-foreground">
                    {day.condition}
                  </TableCell>
                  <TableCell className="text-center text-xs text-muted-foreground">
                    {day.tempMin}°
                  </TableCell>
                  <TableCell className="text-center text-xs font-semibold">
                    {day.tempMax}°
                  </TableCell>
                  <TableCell className="text-center text-xs text-blue-600">
                    {day.precipitation}mm
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// Main page with all three widgets
export default function WeatherVietnam() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CityWeatherTable city="Hanoi" />
          <CityWeatherTable city="Ho Chi Minh City" />
          <CityWeatherTable city="Ha Long Bay" />
        </div>
      </div>
    </div>
  )
}

// Individual city pages for embedding
export function HanoiWidget() {
  return (
    <div className="p-4 bg-background min-h-screen">
      <CityWeatherTable city="Hanoi" maxHeight={500} showHeader={false} />
    </div>
  )
}

export function HoChiMinhWidget() {
  return (
    <div className="p-4 bg-background min-h-screen">
      <CityWeatherTable city="Ho Chi Minh City" maxHeight={500} showHeader={false} />
    </div>
  )
}

export function HaLongBayWidget() {
  return (
    <div className="p-4 bg-background min-h-screen">
      <CityWeatherTable city="Ha Long Bay" maxHeight={500} showHeader={false} />
    </div>
  )
}
