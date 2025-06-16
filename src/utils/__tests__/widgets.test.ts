import { describe, it, expect } from 'vitest'
import { filterWidgetsByCategory, getWidgetById, getWidgetsByTag } from '../widgets'
import type { Widget } from '@/types/widget'
import { WIDGETS, WIDGET_CATEGORIES } from '../../constants/widgets'

const mockWidgets: Widget[] = [
  {
    id: 'test-widget-1',
    title: 'Test Widget 1',
    description: 'A test widget for Vietnam',
    path: '/test-1',
    category: 'vietnam',
    tags: ['test', 'vietnam'],
  },
  {
    id: 'test-widget-2',
    title: 'Test Widget 2',
    description: 'A test widget for productivity',
    path: '/test-2',
    category: 'productivity',
    tags: ['test', 'productivity'],
  },
]

describe('Widget Utilities', () => {
  describe('filterWidgetsByCategory', () => {
    it('should filter widgets by category', () => {
      const vietnamWidgets = filterWidgetsByCategory(mockWidgets, 'vietnam')
      expect(vietnamWidgets).toHaveLength(1)
      expect(vietnamWidgets[0]!.id).toBe('test-widget-1')
    })

    it('should return empty array for non-existent category', () => {
      const result = filterWidgetsByCategory(mockWidgets, 'non-existent')
      expect(result).toEqual([])
    })

    it('should filter real widgets by Vietnam category', () => {
      const vietnamWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.VIETNAM)
      expect(vietnamWidgets.length).toBeGreaterThan(0)
      vietnamWidgets.forEach((widget) => {
        expect(widget.category).toBe(WIDGET_CATEGORIES.VIETNAM)
      })
    })

    it('should filter real widgets by Productivity category', () => {
      const productivityWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.PRODUCTIVITY)
      expect(productivityWidgets.length).toBeGreaterThan(0)
      productivityWidgets.forEach((widget) => {
        expect(widget.category).toBe(WIDGET_CATEGORIES.PRODUCTIVITY)
      })
    })

    it('should filter real widgets by Utilities category', () => {
      const utilityWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.UTILITIES)
      expect(utilityWidgets.length).toBeGreaterThan(0)
      utilityWidgets.forEach((widget) => {
        expect(widget.category).toBe(WIDGET_CATEGORIES.UTILITIES)
      })
    })

    it('should filter real widgets by Personal category', () => {
      const personalWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.PERSONAL)
      expect(personalWidgets.length).toBeGreaterThan(0)
      personalWidgets.forEach((widget) => {
        expect(widget.category).toBe(WIDGET_CATEGORIES.PERSONAL)
      })
    })
  })

  describe('getWidgetById', () => {
    it('should return widget by id', () => {
      const widget = getWidgetById(mockWidgets, 'test-widget-1')
      expect(widget).toBeDefined()
      expect(widget?.id).toBe('test-widget-1')
    })

    it('should return undefined for non-existent id', () => {
      const widget = getWidgetById(mockWidgets, 'non-existent')
      expect(widget).toBeUndefined()
    })
  })

  describe('getWidgetsByTag', () => {
    it('should filter widgets by tag', () => {
      const testWidgets = getWidgetsByTag(mockWidgets, 'test')
      expect(testWidgets).toHaveLength(2)
    })

    it('should return empty array for non-existent tag', () => {
      const result = getWidgetsByTag(mockWidgets, 'non-existent-tag')
      expect(result).toEqual([])
    })

    it('should filter real widgets by weather tag', () => {
      const weatherWidgets = getWidgetsByTag(WIDGETS, 'weather')
      expect(weatherWidgets.length).toBeGreaterThan(0)
      weatherWidgets.forEach((widget) => {
        expect(widget.tags).toContain('weather')
      })
    })

    it('should filter real widgets by vietnam tag', () => {
      const vietnamWidgets = getWidgetsByTag(WIDGETS, 'vietnam')
      expect(vietnamWidgets.length).toBeGreaterThan(0)
      vietnamWidgets.forEach((widget) => {
        expect(widget.tags).toContain('vietnam')
      })
    })
  })

  describe('Widget Category Validation', () => {
    it('should ensure 100% of widgets have valid categories', () => {
      const validCategories = Object.values(WIDGET_CATEGORIES)

      WIDGETS.forEach((widget) => {
        expect(validCategories).toContain(widget.category)
      })
    })

    it('should ensure all widgets are discoverable through category filters', () => {
      const vietnamWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.VIETNAM)
      const productivityWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.PRODUCTIVITY)
      const utilityWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.UTILITIES)
      const personalWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.PERSONAL)

      const totalCategorizedWidgets =
        vietnamWidgets.length +
        productivityWidgets.length +
        utilityWidgets.length +
        personalWidgets.length

      expect(totalCategorizedWidgets).toBe(WIDGETS.length)
    })

    it('should ensure no widget is orphaned without a category', () => {
      const validCategories = Object.values(WIDGET_CATEGORIES) as string[]
      const orphanedWidgets = WIDGETS.filter((widget) => !validCategories.includes(widget.category))

      expect(orphanedWidgets).toEqual([])
    })

    it('should ensure each category has at least one widget', () => {
      const vietnamWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.VIETNAM)
      const productivityWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.PRODUCTIVITY)
      const utilityWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.UTILITIES)
      const personalWidgets = filterWidgetsByCategory(WIDGETS, WIDGET_CATEGORIES.PERSONAL)

      expect(vietnamWidgets.length).toBeGreaterThan(0)
      expect(productivityWidgets.length).toBeGreaterThan(0)
      expect(utilityWidgets.length).toBeGreaterThan(0)
      expect(personalWidgets.length).toBeGreaterThan(0)
    })
  })

  describe('Widget Implementation Validation', () => {
    it('should ensure all widgets have valid paths', () => {
      WIDGETS.forEach((widget) => {
        expect(widget.path).toBeDefined()
        expect(widget.path).toMatch(/^\/[a-z-]+\/[a-z-]+$|^\/[a-z-]+$/)
      })
    })

    it('should ensure all widgets have required properties', () => {
      WIDGETS.forEach((widget) => {
        expect(widget.id).toBeDefined()
        expect(widget.title).toBeDefined()
        expect(widget.description).toBeDefined()
        expect(widget.path).toBeDefined()
        expect(widget.category).toBeDefined()
        expect(widget.tags).toBeDefined()
        expect(Array.isArray(widget.tags)).toBe(true)
        expect(widget.tags?.length).toBeGreaterThan(0)
      })
    })

    it('should ensure widget IDs are unique', () => {
      const ids = WIDGETS.map((widget) => widget.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should ensure widget paths are unique', () => {
      const paths = WIDGETS.map((widget) => widget.path)
      const uniquePaths = new Set(paths)
      expect(uniquePaths.size).toBe(paths.length)
    })

    it('should ensure all widgets follow naming conventions', () => {
      WIDGETS.forEach((widget) => {
        // ID should be kebab-case
        expect(widget.id).toMatch(/^[a-z0-9-]+$/)

        // Path should start with /
        expect(widget.path).toMatch(/^\//)

        // Title should not be empty
        expect(widget.title.trim().length).toBeGreaterThan(0)

        // Description should not be empty
        expect(widget.description.trim().length).toBeGreaterThan(0)
      })
    })
  })
})
