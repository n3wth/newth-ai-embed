import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Home Page UX Tests', () => {
  describe('Initial Page Load', () => {
    it('should display the logo and brand name', () => {
      renderWithRouter(<Home />)

      const logo = screen.getByTestId('logo')
      expect(logo).toBeInTheDocument()
      expect(screen.getByText('Newth.ai Widgets')).toBeInTheDocument()
    })

    it('should show tabs navigation', () => {
      renderWithRouter(<Home />)

      const tabsList = screen.getByTestId('tabs-list')
      expect(tabsList).toBeInTheDocument()
      expect(screen.getByTestId('tab-all')).toBeInTheDocument()
      expect(screen.getByTestId('tab-vietnam')).toBeInTheDocument()
    })

    it('should default to "All" tab being active', () => {
      renderWithRouter(<Home />)

      const allTab = screen.getByTestId('tab-all')
      expect(allTab).toHaveAttribute('data-state', 'active')
    })

    it('should display widget grid on initial load', () => {
      renderWithRouter(<Home />)

      const allTabContent = screen.getByTestId('tab-content-all')
      expect(allTabContent).toBeInTheDocument()

      // Should show some widgets
      const widgets = screen.getAllByTestId(/widget-card-/)
      expect(widgets.length).toBeGreaterThan(0)
    })
  })

  describe('Tab Navigation UX', () => {
    it('should switch to Vietnam tab when clicked', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Home />)

      const vietnamTab = screen.getByTestId('tab-vietnam')
      await user.click(vietnamTab)

      expect(vietnamTab).toHaveAttribute('data-state', 'active')
    })

    it('should show Vietnam content when Vietnam tab is active', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Home />)

      const vietnamTab = screen.getByTestId('tab-vietnam')
      await user.click(vietnamTab)

      const vietnamTabContent = screen.getByTestId('tab-content-vietnam')
      expect(vietnamTabContent).toBeInTheDocument()
    })

    it('should switch back to All tab', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Home />)

      // First switch to Vietnam
      const vietnamTab = screen.getByTestId('tab-vietnam')
      await user.click(vietnamTab)

      // Then switch back to All
      const allTab = screen.getByTestId('tab-all')
      await user.click(allTab)

      expect(allTab).toHaveAttribute('data-state', 'active')
    })
  })

  describe('Widget Display UX', () => {
    it('should display Vietnam weather widgets', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Home />)

      const vietnamTab = screen.getByTestId('tab-vietnam')
      await user.click(vietnamTab)

      // Should show Vietnam-specific widgets
      const vietnamWidgets = screen.getAllByTestId(/widget-card-/)
      expect(vietnamWidgets.length).toBeGreaterThan(0)
    })

    it('should show widget descriptions', () => {
      renderWithRouter(<Home />)

      // Check for widget descriptions
      const descriptions = screen.getAllByText(/weather/i)
      expect(descriptions.length).toBeGreaterThan(0)
    })

    it('should have clickable widget links', () => {
      renderWithRouter(<Home />)

      const widgetLinks = screen.getAllByText('View in app →')
      expect(widgetLinks.length).toBeGreaterThan(0)

      // Check that links have proper href attributes
      widgetLinks.forEach((link) => {
        expect(link.closest('a')).toHaveAttribute('href')
      })
    })
  })

  describe('Responsive Design UX', () => {
    it('should have responsive grid classes', () => {
      renderWithRouter(<Home />)

      const widgetGrid = screen.getByTestId('widget-grid')
      expect(widgetGrid).toHaveClass('grid')
    })

    it('should have proper container spacing', () => {
      renderWithRouter(<Home />)

      const container = screen.getByTestId('widget-tabs').closest('.container')
      expect(container).toHaveClass('mx-auto', 'px-4', 'pb-16')
    })
  })

  describe('Accessibility UX', () => {
    it('should have proper heading hierarchy', () => {
      renderWithRouter(<Home />)

      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toHaveTextContent('Newth.ai Widgets')

      // Check that the hero title text exists (it's now AnimatedGradientText, not h2)
      expect(screen.getByText('My Personal Widget Collection')).toBeInTheDocument()
    })

    it('should have accessible tab navigation', () => {
      renderWithRouter(<Home />)

      const tabList = screen.getByRole('tablist')
      expect(tabList).toBeInTheDocument()

      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBe(5)
    })

    it('should have accessible links', () => {
      renderWithRouter(<Home />)

      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)

      // All links should have accessible text
      links.forEach((link) => {
        expect(link).toHaveAccessibleName()
      })
    })
  })

  describe('Keyboard Navigation UX', () => {
    it('should support keyboard navigation for tabs', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Home />)

      const allTab = screen.getByTestId('tab-all')
      const vietnamTab = screen.getByTestId('tab-vietnam')

      // Focus on first tab
      allTab.focus()
      expect(allTab).toHaveFocus()

      // Navigate to next tab with arrow key
      await user.keyboard('{ArrowRight}')
      expect(vietnamTab).toHaveFocus()
    })

    it('should activate tab with Enter key', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Home />)

      const vietnamTab = screen.getByTestId('tab-vietnam')
      vietnamTab.focus()

      await user.keyboard('{Enter}')
      expect(vietnamTab).toHaveAttribute('data-state', 'active')
    })
  })

  describe('Performance UX', () => {
    it('should render widgets efficiently', () => {
      const startTime = performance.now()
      renderWithRouter(<Home />)
      const endTime = performance.now()

      // Should render in reasonable time (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('should not cause layout shifts during tab switching', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Home />)

      const container = screen.getByTestId('widget-tabs')
      const initialHeight = container.getBoundingClientRect().height

      // Switch tabs
      const vietnamTab = screen.getByTestId('tab-vietnam')
      await user.click(vietnamTab)

      // Height should remain stable (allowing for small variations)
      const newHeight = container.getBoundingClientRect().height
      expect(Math.abs(newHeight - initialHeight)).toBeLessThan(50)
    })
  })
})
