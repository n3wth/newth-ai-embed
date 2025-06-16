import { useLocation } from 'react-router-dom'

const NotFound = () => {
  const location = useLocation()

  return (
    <div className="text-center py-12 px-4 text-gray-600">
      <h1 className="text-3xl font-bold mb-4 text-black">404 - Page Not Found</h1>
      <p className="mb-6">The page you're looking for doesn't exist.</p>
      <div className="bg-white border border-gray-200 p-6 rounded-lg max-w-lg mx-auto text-left shadow-sm">
        <p className="mb-2">
          Current path: <span className="font-mono text-xs text-black">{location.pathname}</span>
        </p>
        <p className="mb-1">Available routes:</p>
        <ul className="list-disc pl-6 text-sm">
          <li>/</li>
          <li>/weather-vietnam</li>
        </ul>
      </div>
    </div>
  )
}

export default NotFound
