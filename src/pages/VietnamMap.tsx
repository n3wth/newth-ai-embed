import { Card, CardContent } from '@/components/ui/card'

export default function VietnamMap() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1z4tx3cKm2w41sj6dW18jRRltKZl_WjI&ehbc=2E312F&noprof=1"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vietnam Trip Itinerary Map"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
