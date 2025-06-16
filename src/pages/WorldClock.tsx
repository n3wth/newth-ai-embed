import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Globe } from 'lucide-react'

interface TimeZone {
  name: string
  timezone: string
  city: string
  country: string
  flag: string
}

const TIME_ZONES: TimeZone[] = [
  {
    name: 'San Francisco',
    timezone: 'America/Los_Angeles',
    city: 'San Francisco',
    country: 'USA',
    flag: '🇺🇸',
  },
  {
    name: 'New York',
    timezone: 'America/New_York',
    city: 'New York',
    country: 'USA',
    flag: '🇺🇸',
  },
  {
    name: 'London',
    timezone: 'Europe/London',
    city: 'London',
    country: 'UK',
    flag: '🇬🇧',
  },
  {
    name: 'Paris',
    timezone: 'Europe/Paris',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
  },
  {
    name: 'Tokyo',
    timezone: 'Asia/Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
  },
  {
    name: 'Sydney',
    timezone: 'Australia/Sydney',
    city: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
  },
  {
    name: 'Ho Chi Minh City',
    timezone: 'Asia/Ho_Chi_Minh',
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    flag: '🇻🇳',
  },
]

interface TimeInfo {
  time: string
  date: string
  period: string
  isNextDay: boolean
  dayOffset: number
}

function getTimeInfo(timezone: string, baseDate: Date): TimeInfo {
  const timeInZone = new Date(baseDate.toLocaleString('en-US', { timeZone: timezone }))
  const baseTime = new Date(baseDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })) // SF time as base

  const time = timeInZone.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const period = timeInZone
    .toLocaleTimeString('en-US', {
      hour12: true,
    })
    .split(' ')[1]

  const date = timeInZone.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  // Calculate day offset
  const baseDayOfYear = Math.floor(
    (baseTime.getTime() - new Date(baseTime.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  )
  const zoneDayOfYear = Math.floor(
    (timeInZone.getTime() - new Date(timeInZone.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  const dayOffset = zoneDayOfYear - baseDayOfYear

  return {
    time,
    date,
    period: period!,
    isNextDay: dayOffset > 0,
    dayOffset,
  }
}

function TimeZoneCard({ timezone, currentTime }: { timezone: TimeZone; currentTime: Date }) {
  const timeInfo = getTimeInfo(timezone.timezone, currentTime)

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="text-lg">{timezone.flag}</span>
            {timezone.city}
          </CardTitle>
          {timeInfo.dayOffset !== 0 && (
            <Badge variant="outline" className="text-xs">
              {timeInfo.dayOffset > 0 ? '+1 day' : '-1 day'}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-center">
          <div className="text-2xl font-mono font-bold">{timeInfo.time}</div>
          <div className="text-sm text-muted-foreground">{timeInfo.date}</div>
        </div>

        <div className="text-center">
          <Badge variant="secondary" className="text-xs">
            {timezone.country}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default function WorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              World Clock
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Current time across different time zones
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TIME_ZONES.map((timezone) => (
            <TimeZoneCard key={timezone.timezone} timezone={timezone} currentTime={currentTime} />
          ))}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Updates every second</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Times are automatically adjusted for daylight saving time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
