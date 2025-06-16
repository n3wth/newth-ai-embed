import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import WeatherVietnam from './WeatherVietnam'
import VietnamFlights from './VietnamFlights'
import VietnamMap from './VietnamMap'
import VietnamItinerary from './VietnamItinerary'

export default function VietnamDashboard() {
  // Vietnam widgets available for future extensibility
  // const vietnamWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.VIETNAM);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
                  Vietnam Trip Dashboard
                </h2>
                <p className="text-sm text-green-600 dark:text-green-400">
                  All-in-one view: weather, flights, itinerary, and map
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Overview */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Weather Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <WeatherVietnam />
            </CardContent>
          </Card>
        </section>

        {/* Flights */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Flights</CardTitle>
            </CardHeader>
            <CardContent>
              <VietnamFlights />
            </CardContent>
          </Card>
        </section>

        {/* Itinerary */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Itinerary</CardTitle>
            </CardHeader>
            <CardContent>
              <VietnamItinerary />
            </CardContent>
          </Card>
        </section>

        {/* Map */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Trip Map</CardTitle>
            </CardHeader>
            <CardContent>
              <VietnamMap />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
