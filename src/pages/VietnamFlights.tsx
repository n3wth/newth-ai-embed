import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Plane, Clock, MapPin, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FlightDetails {
  direction: 'outbound' | 'return'
  airline: string
  flightNumber: string
  departure: {
    date: string
    time: string
    airport: string
    city: string
  }
  arrival: {
    date: string
    time: string
    airport: string
    city: string
  }
  duration: string
  aircraft: string
  class: string
  cost?: number
}

const FLIGHT_DATA: FlightDetails[] = [
  {
    direction: 'outbound',
    airline: 'Vietnam Airlines',
    flightNumber: 'VN 99',
    departure: {
      date: 'Thursday, June 26, 2025',
      time: '10:50 PM',
      airport: 'SFO',
      city: 'San Francisco',
    },
    arrival: {
      date: 'Saturday, June 28, 2025',
      time: '4:30 AM',
      airport: 'SGN',
      city: 'Ho Chi Minh City',
    },
    duration: '15 hours 40 minutes',
    aircraft: 'Boeing 787',
    class: 'Economy',
  },
  {
    direction: 'return',
    airline: 'Vietnam Airlines',
    flightNumber: 'VN 98',
    departure: {
      date: 'Sunday, July 6, 2025',
      time: '6:45 PM',
      airport: 'SGN',
      city: 'Ho Chi Minh City',
    },
    arrival: {
      date: 'Sunday, July 6, 2025',
      time: '6:40 PM',
      airport: 'SFO',
      city: 'San Francisco',
    },
    duration: '13 hours 55 minutes',
    aircraft: 'Boeing 787',
    class: 'Economy',
    cost: 300,
  },
  {
    direction: 'outbound',
    airline: 'Vietnam Airlines',
    flightNumber: 'VN 246',
    departure: {
      date: 'Wednesday, July 2, 2025',
      time: '8:00 AM',
      airport: 'HAN',
      city: 'Hanoi',
    },
    arrival: {
      date: 'Wednesday, July 2, 2025',
      time: '10:10 AM',
      airport: 'SGN',
      city: 'Ho Chi Minh City',
    },
    duration: '2 hours 10 minutes',
    aircraft: 'Airbus A321',
    class: 'Economy',
    cost: 381.83,
  },
]

interface FlightCardProps {
  flight: FlightDetails
  className?: string
}

function FlightCard({ flight, className }: FlightCardProps) {
  const isOutbound = flight.direction === 'outbound'

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plane
              className={cn(
                'h-5 w-5 transition-transform',
                isOutbound ? 'text-green-600' : 'text-blue-600 rotate-180'
              )}
            />
            {isOutbound ? 'Outbound Flight' : 'Return Flight'}
          </CardTitle>
          <Badge variant={isOutbound ? 'default' : 'secondary'} className="text-xs">
            {flight.flightNumber}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Flight Route */}
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm font-medium">{flight.departure.airport}</span>
            </div>
            <p className="text-xs text-muted-foreground">{flight.departure.city}</p>
          </div>

          <div className="flex items-center gap-2 px-4">
            <div className="h-px bg-border flex-1"></div>
            <Plane className="h-4 w-4 text-muted-foreground" />
            <div className="h-px bg-border flex-1"></div>
          </div>

          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm font-medium">{flight.arrival.airport}</span>
            </div>
            <p className="text-xs text-muted-foreground">{flight.arrival.city}</p>
          </div>
        </div>

        <Separator />

        {/* Flight Times */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Departure</span>
            </div>
            <p className="text-sm font-semibold">{flight.departure.time}</p>
            <p className="text-xs text-muted-foreground">{flight.departure.date}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Arrival</span>
            </div>
            <p className="text-sm font-semibold">{flight.arrival.time}</p>
            <p className="text-xs text-muted-foreground">{flight.arrival.date}</p>
          </div>
        </div>

        <Separator />

        {/* Flight Details */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">Duration:</span>
            </div>
            <p className="text-muted-foreground">{flight.duration}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Plane className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">Aircraft:</span>
            </div>
            <p className="text-muted-foreground">{flight.aircraft}</p>
          </div>
        </div>

        {/* Airline and Class */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium">{flight.airline}</span>
          <Badge variant="outline" className="text-xs">
            {flight.class}
          </Badge>
        </div>
        {flight.direction === 'return' && flight.cost && (
          <div className="pt-2 text-right">
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">
              Cost: ${flight.cost}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function VietnamFlights() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FLIGHT_DATA.map((flight) => (
            <FlightCard key={flight.direction} flight={flight} />
          ))}
        </div>
      </div>
    </div>
  )
}
