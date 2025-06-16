import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { WidgetGrid } from '../WidgetGrid'
import type { Widget } from '@/types/widget'

const mockWidgets: Widget[] = [
  {
    id: 'widget-1',
    title: 'Widget 1',
    description: 'Description 1',
    path: '/widget-1',
    category: 'test',
  },
  {
    id: 'widget-2',
    title: 'Widget 2',
    description: 'Description 2',
    path: '/widget-2',
    category: 'test',
  },
]

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('WidgetGrid', () => {
  it('should render all widgets when provided', () => {
    renderWithRouter(<WidgetGrid widgets={mockWidgets} />)

    expect(screen.getByTestId('widget-grid')).toBeInTheDocument()
    expect(screen.getByText('Widget 1')).toBeInTheDocument()
    expect(screen.getByText('Widget 2')).toBeInTheDocument()
    expect(screen.getAllByTestId(/^widget-card-/)).toHaveLength(2)
  })

  it('should show empty state when no widgets provided', () => {
    renderWithRouter(<WidgetGrid widgets={[]} />)

    expect(screen.getByTestId('empty-widget-grid')).toBeInTheDocument()
    expect(screen.getByText('No widgets found')).toBeInTheDocument()
    expect(screen.getByText('No widgets match the current filter criteria.')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    renderWithRouter(<WidgetGrid widgets={mockWidgets} className="custom-grid-class" />)

    const grid = screen.getByTestId('widget-grid')
    expect(grid).toHaveClass('custom-grid-class')
  })

  it('should have proper grid layout classes', () => {
    renderWithRouter(<WidgetGrid widgets={mockWidgets} />)

    const grid = screen.getByTestId('widget-grid')
    expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6')
  })

  it('should render correct number of widget cards', () => {
    const singleWidget = [mockWidgets[0]!]
    renderWithRouter(<WidgetGrid widgets={singleWidget} />)

    expect(screen.getAllByTestId(/^widget-card-/)).toHaveLength(1)
  })
})
