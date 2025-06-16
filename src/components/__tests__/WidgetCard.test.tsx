import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { WidgetCard } from '../WidgetCard'
import type { Widget } from '@/types/widget'

const mockWidget: Widget = {
  id: 'test-widget',
  title: 'Test Widget',
  description: 'This is a test widget description',
  path: '/test-widget',
  category: 'vietnam',
  tags: ['test', 'example'],
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('WidgetCard', () => {
  it('should render widget information correctly', () => {
    renderWithRouter(<WidgetCard widget={mockWidget} />)

    expect(screen.getByText('Test Widget')).toBeInTheDocument()
    expect(screen.getByText('This is a test widget description')).toBeInTheDocument()
    expect(screen.getByText('View in app →')).toBeInTheDocument()
  })

  it('should have correct test IDs', () => {
    renderWithRouter(<WidgetCard widget={mockWidget} />)

    expect(screen.getByTestId('widget-card-test-widget')).toBeInTheDocument()
    expect(screen.getByTestId('widget-link-test-widget')).toBeInTheDocument()
  })

  it('should have correct link href', () => {
    renderWithRouter(<WidgetCard widget={mockWidget} />)

    const link = screen.getByTestId('widget-link-test-widget')
    expect(link).toHaveAttribute('href', '/test-widget')
  })

  it('should apply custom className', () => {
    renderWithRouter(<WidgetCard widget={mockWidget} className="custom-class" />)

    const card = screen.getByTestId('widget-card-test-widget')
    expect(card).toHaveClass('custom-class')
  })

  it('should have proper accessibility structure', () => {
    renderWithRouter(<WidgetCard widget={mockWidget} />)

    // Check for widget title
    expect(screen.getByText('Test Widget')).toBeInTheDocument()

    const link = screen.getByRole('link')
    expect(link).toHaveTextContent('View in app →')
  })

  it('should render tags when provided', () => {
    renderWithRouter(<WidgetCard widget={mockWidget} />)

    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('example')).toBeInTheDocument()
  })

  it('should handle widgets without tags', () => {
    const widgetWithoutTags: Widget = {
      ...mockWidget,
      tags: undefined,
    }

    renderWithRouter(<WidgetCard widget={widgetWithoutTags} />)

    expect(screen.getByText('Test Widget')).toBeInTheDocument()
    expect(screen.queryByText('test')).not.toBeInTheDocument()
  })

  it('should render compact variant correctly', () => {
    renderWithRouter(<WidgetCard widget={mockWidget} variant="compact" />)

    expect(screen.getByText('Test Widget')).toBeInTheDocument()
    expect(screen.getByText('View in app →')).toBeInTheDocument()
  })

  it('should show limited tags with overflow indicator', () => {
    const widgetWithManyTags: Widget = {
      ...mockWidget,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    }

    renderWithRouter(<WidgetCard widget={widgetWithManyTags} />)

    expect(screen.getByText('tag1')).toBeInTheDocument()
    expect(screen.getByText('tag2')).toBeInTheDocument()
    expect(screen.getByText('tag3')).toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()
    expect(screen.queryByText('tag4')).not.toBeInTheDocument()
  })
})
