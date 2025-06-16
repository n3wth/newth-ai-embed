import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()

  // Hide any wrapper for embedded widget pages
  const isEmbeddedWidget =
    location.pathname.startsWith('/vietnam/') || location.pathname === '/weather-vietnam'

  if (isEmbeddedWidget) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  // For main pages, just return children (Home page handles its own layout)
  return <>{children}</>
}

export default Layout
