import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WeatherVietnam, {
  HanoiWidget,
  HoChiMinhWidget,
  HaLongBayWidget,
} from './pages/WeatherVietnam'
import VietnamFlights from './pages/VietnamFlights'
import VietnamMap from './pages/VietnamMap'
import VietnamItinerary from './pages/VietnamItinerary'
import PomodoroTimer from './pages/PomodoroTimer'
import QuickNotes from './pages/QuickNotes'
import HabitTracker from './pages/HabitTracker'
import WorldClock from './pages/WorldClock'
import ColorPalette from './pages/ColorPalette'
import QRCodeGenerator from './pages/QRCodeGenerator'
import SanFranciscoWeather from './pages/SanFranciscoWeather'
import ReadingList from './pages/ReadingList'
import WorkoutLog from './pages/WorkoutLog'
import NotFound from './pages/NotFound'
import VietnamDashboard from './pages/VietnamDashboard'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather-vietnam" element={<WeatherVietnam />} />
        <Route path="/vietnam/flights" element={<VietnamFlights />} />
        <Route path="/vietnam/map" element={<VietnamMap />} />
        <Route path="/vietnam/itinerary" element={<VietnamItinerary />} />
        <Route path="/vietnam/hanoi" element={<HanoiWidget />} />
        <Route path="/vietnam/hochiminh" element={<HoChiMinhWidget />} />
        <Route path="/vietnam/halongbay" element={<HaLongBayWidget />} />
        <Route path="/vietnam/dashboard" element={<VietnamDashboard />} />
        <Route path="/productivity/pomodoro" element={<PomodoroTimer />} />
        <Route path="/productivity/notes" element={<QuickNotes />} />
        <Route path="/productivity/habits" element={<HabitTracker />} />
        <Route path="/utilities/world-clock" element={<WorldClock />} />
        <Route path="/utilities/colors" element={<ColorPalette />} />
        <Route path="/utilities/qr-code" element={<QRCodeGenerator />} />
        <Route path="/personal/sf-weather" element={<SanFranciscoWeather />} />
        <Route path="/personal/reading" element={<ReadingList />} />
        <Route path="/personal/workout" element={<WorkoutLog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
