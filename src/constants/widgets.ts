import type { Widget } from '@/types/widget'

export const WIDGET_CATEGORIES = {
  ALL: 'all',
  VIETNAM: 'vietnam',
  PRODUCTIVITY: 'productivity',
  UTILITIES: 'utilities',
  PERSONAL: 'personal',
} as const

export const WIDGETS: Widget[] = [
  // Vietnam Trip Widgets
  {
    id: 'vietnam-weather-overview',
    title: 'Vietnam Trip Weather Overview',
    description:
      'Complete weather dashboard for my Vietnam trip planning - Hanoi, Ho Chi Minh City, and Ha Long Bay forecasts in one view',
    path: '/weather-vietnam',
    category: WIDGET_CATEGORIES.VIETNAM,
    tags: ['weather', 'vietnam', 'travel', 'planning'],
  },
  {
    id: 'vietnam-flights',
    title: 'Vietnam Trip Flights',
    description:
      'Flight details for my Vietnam trip - outbound and return flights with Vietnam Airlines',
    path: '/vietnam/flights',
    category: WIDGET_CATEGORIES.VIETNAM,
    tags: ['flights', 'vietnam', 'travel', 'airlines'],
  },
  {
    id: 'vietnam-map',
    title: 'Vietnam Trip Map',
    description: 'Interactive map showing all the locations from my Vietnam trip itinerary',
    path: '/vietnam/map',
    category: WIDGET_CATEGORIES.VIETNAM,
    tags: ['map', 'vietnam', 'locations', 'interactive'],
  },
  {
    id: 'vietnam-itinerary',
    title: 'Vietnam Trip Itinerary',
    description:
      'Detailed itinerary cards for each location - Ho Chi Minh City, Hanoi, Ha Long Bay, and Ninh Binh',
    path: '/vietnam/itinerary',
    category: WIDGET_CATEGORIES.VIETNAM,
    tags: ['itinerary', 'vietnam', 'locations', 'planning'],
  },
  {
    id: 'hanoi-weather',
    title: 'Hanoi Weather Widget',
    description:
      'Dedicated weather forecast for Hanoi - perfect for planning my northern Vietnam itinerary',
    path: '/vietnam/hanoi',
    category: WIDGET_CATEGORIES.VIETNAM,
    tags: ['weather', 'hanoi', 'vietnam', 'forecast'],
  },
  {
    id: 'hochiminh-weather',
    title: 'Ho Chi Minh City Weather',
    description:
      'Weather tracking for Ho Chi Minh City (Saigon) - essential for my southern Vietnam adventures',
    path: '/vietnam/hochiminh',
    category: WIDGET_CATEGORIES.VIETNAM,
    tags: ['weather', 'saigon', 'vietnam', 'forecast'],
  },
  {
    id: 'halongbay-weather',
    title: 'Ha Long Bay Weather',
    description:
      'Weather conditions for Ha Long Bay - crucial for planning the perfect boat trip and photography',
    path: '/vietnam/halongbay',
    category: WIDGET_CATEGORIES.VIETNAM,
    tags: ['weather', 'halongbay', 'vietnam', 'cruise'],
  },

  // Productivity Widgets
  {
    id: 'pomodoro-timer',
    title: 'Pomodoro Timer',
    description:
      'Focus timer with 25-minute work sessions and 5-minute breaks to boost productivity',
    path: '/productivity/pomodoro',
    category: WIDGET_CATEGORIES.PRODUCTIVITY,
    tags: ['timer', 'focus', 'productivity', 'pomodoro'],
  },
  {
    id: 'habit-tracker',
    title: 'Daily Habit Tracker',
    description: 'Track daily habits and build consistent routines with visual progress indicators',
    path: '/productivity/habits',
    category: WIDGET_CATEGORIES.PRODUCTIVITY,
    tags: ['habits', 'tracking', 'goals', 'routine'],
  },
  {
    id: 'quick-notes',
    title: 'Quick Notes',
    description: 'Simple note-taking widget for capturing thoughts and ideas on the go',
    path: '/productivity/notes',
    category: WIDGET_CATEGORIES.PRODUCTIVITY,
    tags: ['notes', 'writing', 'ideas', 'capture'],
  },

  // Utility Widgets
  {
    id: 'world-clock',
    title: 'World Clock',
    description: 'Display current time across multiple time zones for global coordination',
    path: '/utilities/world-clock',
    category: WIDGET_CATEGORIES.UTILITIES,
    tags: ['time', 'timezone', 'clock', 'global'],
  },
  {
    id: 'color-palette',
    title: 'Color Palette Generator',
    description:
      'Generate beautiful color palettes for design projects with hex codes and previews',
    path: '/utilities/colors',
    category: WIDGET_CATEGORIES.UTILITIES,
    tags: ['colors', 'design', 'palette', 'generator'],
  },
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description:
      'Generate QR codes for URLs, text, or contact information with customizable options',
    path: '/utilities/qr-code',
    category: WIDGET_CATEGORIES.UTILITIES,
    tags: ['qr', 'generator', 'code', 'sharing'],
  },

  // Personal Widgets
  {
    id: 'sf-weather',
    title: 'San Francisco Weather',
    description: 'Local weather forecast for San Francisco - my home base weather tracking',
    path: '/personal/sf-weather',
    category: WIDGET_CATEGORIES.PERSONAL,
    tags: ['weather', 'sanfrancisco', 'local', 'forecast'],
  },
  {
    id: 'reading-list',
    title: 'Reading List',
    description: 'Track books to read, currently reading, and completed with progress and notes',
    path: '/personal/reading',
    category: WIDGET_CATEGORIES.PERSONAL,
    tags: ['books', 'reading', 'tracking', 'progress'],
  },
  {
    id: 'workout-log',
    title: 'Workout Log',
    description: 'Simple workout tracking with exercises, sets, reps, and progress over time',
    path: '/personal/workout',
    category: WIDGET_CATEGORIES.PERSONAL,
    tags: ['fitness', 'workout', 'exercise', 'tracking'],
  },
]
