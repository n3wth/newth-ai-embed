import type { Widget } from '@/types/widget'
import { WidgetCard } from './WidgetCard'

interface WidgetGridProps {
  widgets: Widget[]
  className?: string
}

export const WidgetGrid = ({ widgets, className = '' }: WidgetGridProps) => {
  if (widgets.length === 0) {
    return (
      <div className="text-center py-12" data-testid="empty-widget-grid">
        <h3 className="text-lg font-semibold text-black mb-2">No widgets found</h3>
        <p className="text-gray-600">No widgets match the current filter criteria.</p>
      </div>
    )
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      data-testid="widget-grid"
    >
      {widgets.map((widget) => (
        <WidgetCard key={widget.id} widget={widget} />
      ))}
    </div>
  )
}
