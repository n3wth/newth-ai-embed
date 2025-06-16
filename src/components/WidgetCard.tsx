import React, { useState, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { ExternalLinkIcon, CopyIcon, CheckIcon, LoaderIcon } from 'lucide-react'
import type { Widget } from '@/types/widget'
import { BASE_URL } from '@/constants/config'
import { cn } from '@/lib/utils'

interface WidgetCardProps {
  widget: Widget
  className?: string
  variant?: 'default' | 'compact'
}

// Dynamic imports for widget components
const getWidgetComponent = (path: string) => {
  const componentMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
    '/weather-vietnam': () => import('../pages/WeatherVietnam'),
    '/vietnam/flights': () => import('../pages/VietnamFlights'),
    '/vietnam/map': () => import('../pages/VietnamMap'),
    '/vietnam/itinerary': () => import('../pages/VietnamItinerary'),
    '/vietnam/hanoi': () =>
      import('../pages/WeatherVietnam').then((module) => ({ default: module.HanoiWidget })),
    '/vietnam/hochiminh': () =>
      import('../pages/WeatherVietnam').then((module) => ({ default: module.HoChiMinhWidget })),
    '/vietnam/halongbay': () =>
      import('../pages/WeatherVietnam').then((module) => ({ default: module.HaLongBayWidget })),
    '/productivity/pomodoro': () => import('../pages/PomodoroTimer'),
    '/productivity/notes': () => import('../pages/QuickNotes'),
    '/productivity/habits': () => import('../pages/HabitTracker'),
    '/utilities/world-clock': () => import('../pages/WorldClock'),
    '/utilities/colors': () => import('../pages/ColorPalette'),
    '/utilities/qr-code': () => import('../pages/QRCodeGenerator'),
    '/personal/sf-weather': () => import('../pages/SanFranciscoWeather'),
    '/personal/reading': () => import('../pages/ReadingList'),
    '/personal/workout': () => import('../pages/WorkoutLog'),
  }

  return componentMap[path]
}

export const WidgetCard = ({ widget, className = '', variant = 'default' }: WidgetCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const isCompact = variant === 'compact'
  const fullUrl = `${BASE_URL}${widget.path}`

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  const handleVisitWidget = () => {
    window.open(fullUrl, '_blank')
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Create lazy component for the widget
  const WidgetComponent = getWidgetComponent(widget.path)
    ? lazy(getWidgetComponent(widget.path)!)
    : null

  return (
    <>
      <Card
        className={cn(
          'group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-border/50 hover:border-border',
          className
        )}
        onClick={handleCardClick}
        data-testid={`widget-card-${widget.id}`}
      >
        <CardHeader className={cn('pb-3', isCompact && 'pb-2')}>
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle
                className={cn(
                  'text-lg leading-tight group-hover:text-primary transition-colors',
                  isCompact && 'text-base'
                )}
              >
                {widget.title}
              </CardTitle>
              <CardDescription
                className={cn('text-sm text-muted-foreground line-clamp-2', isCompact && 'text-xs')}
              >
                {widget.description}
              </CardDescription>
            </div>
            <ExternalLinkIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1 mb-3">
            {widget.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {widget.tags && widget.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{widget.tags.length - 3}
              </Badge>
            )}
          </div>
          <div onClick={handleLinkClick}>
            <Link
              to={widget.path}
              className="text-sm text-primary hover:underline"
              data-testid={`widget-link-${widget.id}`}
            >
              View in app →
            </Link>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-auto flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">{widget.title}</DialogTitle>
            <DialogDescription>{widget.description}</DialogDescription>
          </DialogHeader>

          <div className="flex-1 space-y-4">
            {/* Embedding Info */}
            <div className="space-y-3 flex-shrink-0 bg-muted/30 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Category:</span>
                  <Badge variant="outline">{widget.category}</Badge>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium">Tags:</span>
                  <div className="flex flex-wrap gap-1">
                    {widget.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* URL Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Embed URL:</label>
                <div className="flex gap-2">
                  <Input
                    value={fullUrl}
                    readOnly
                    className="font-mono text-sm"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <Button
                    onClick={handleCopyUrl}
                    variant="outline"
                    size="icon"
                    className="flex-shrink-0"
                  >
                    {copied ? (
                      <CheckIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {copied && <p className="text-sm text-green-600">URL copied to clipboard!</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={handleVisitWidget} className="flex-1 gap-2">
                  <ExternalLinkIcon className="h-4 w-4" />
                  Open Widget
                </Button>
                <Link to={widget.path} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View in App
                  </Button>
                </Link>
              </div>
            </div>

            {/* Widget Content */}
            {WidgetComponent ? (
              <Suspense
                fallback={
                  <div className="flex items-center justify-center p-8 border rounded-lg bg-background">
                    <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading widget...</span>
                  </div>
                }
              >
                <WidgetComponent />
              </Suspense>
            ) : (
              <div className="flex items-center justify-center p-8 text-muted-foreground border rounded-lg bg-background">
                <div className="text-center">
                  <ExternalLinkIcon className="h-8 w-8 mx-auto mb-3 opacity-50" />
                  <p>Widget preview not available</p>
                  <p className="text-sm">Click "Open Widget" to view in a new tab</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default WidgetCard
