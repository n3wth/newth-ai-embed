import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Clock, DollarSign } from 'lucide-react'

interface ItineraryLocation {
  name: string
  dates: string
  nights: number
  description: string
  type: 'city' | 'cruise' | 'retreat'
  cost: number
}

const ITINERARY_LOCATIONS: ItineraryLocation[] = [
  {
    name: 'Ninh Binh (ChezCao Rice Field Ecolodge)',
    dates: 'Jun 28-30',
    nights: 2,
    description:
      'Ecolodge: $128 • Meals: $80 • Activities: $50 • Transport: $30\nVân Long wetlands, sunrise boat safari, King Room with Balcony',
    type: 'retreat',
    cost: 288,
  },
  {
    name: 'Hanoi',
    dates: 'Jun 30 - Jul 2',
    nights: 2,
    description:
      'Hotel: Peridot Grand Luxury Boutique Hotel $265.71 • Meals: $80 • Activities: $60 • Transport: $60\nOld Quarter, Hoàn Kiếm Lake, Water Puppet Show',
    type: 'city',
    cost: 465.71,
  },
  {
    name: 'Bai Tu Long Bay',
    dates: 'Jul 2-4',
    nights: 2,
    description:
      'All-inclusive Indochina Junk cruise: $1197\nPrivate cruise, kayaking, cave visits, floating village',
    type: 'cruise',
    cost: 1197,
  },
  {
    name: 'Ho Chi Minh City',
    dates: 'Jul 4-6',
    nights: 2,
    description:
      'Airbnb: $184.87 • Meals: $70 • Activities: $80 • Transport: $350 (includes return flight to Hanoi)\nCan Gio Mangrove, Cu Chi Tunnels, final departure',
    type: 'city',
    cost: 684.87,
  },
]

function LocationCard({ location }: { location: ItineraryLocation }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'city':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'cruise':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'retreat':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'city':
        return '🏙️'
      case 'cruise':
        return '🛥️'
      case 'retreat':
        return '🌿'
      default:
        return '📍'
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            {location.name}
          </CardTitle>
          <Badge className={getTypeColor(location.type)}>
            {getTypeIcon(location.type)} {location.type}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Dates</p>
              <p className="text-sm font-medium">{location.dates}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-medium">
                {location.nights} night{location.nights !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              ${location.cost}
            </span>
            <span className="text-sm text-green-600 dark:text-green-400 ml-auto">total cost</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-green-700 dark:text-green-300 uppercase tracking-wide mb-1">
                Cost Breakdown
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                {location.description.split('\n')[0]}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-green-700 dark:text-green-300 uppercase tracking-wide mb-1">
                Includes
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                {location.description.split('\n')[1]}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default function VietnamItinerary() {
  const totalCost = ITINERARY_LOCATIONS.reduce((sum, location) => sum + location.cost, 0)

  return (
    <div className="w-full bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-green-800 dark:text-green-200">
                  Vietnam Trip Itinerary
                </h2>
                <p className="text-sm text-green-600 dark:text-green-400">
                  8 days across 4 destinations
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <span className="text-3xl font-bold text-green-700 dark:text-green-300">
                    ${totalCost}
                  </span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">Total estimated cost</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ITINERARY_LOCATIONS.map((location) => (
            <LocationCard key={location.name} location={location} />
          ))}
        </div>
      </div>
    </div>
  )
}
