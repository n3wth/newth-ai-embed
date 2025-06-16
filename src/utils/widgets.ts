import type { Widget } from '@/types/widget'
import { WIDGET_CATEGORIES } from '@/constants/widgets'

export const filterWidgetsByCategory = (widgets: Widget[], category: string): Widget[] => {
  if (category === WIDGET_CATEGORIES.ALL) {
    return widgets
  }
  return widgets.filter((widget) => widget.category === category)
}

export const getWidgetById = (widgets: Widget[], id: string): Widget | undefined => {
  return widgets.find((widget) => widget.id === id)
}

export const getWidgetsByTag = (widgets: Widget[], tag: string): Widget[] => {
  return widgets.filter((widget) => widget.tags?.includes(tag))
}
