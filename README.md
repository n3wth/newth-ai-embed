# Newth.ai Personal Widgets

A collection of personal widgets I've built for documentation, trip planning, and various projects. Currently featuring weather widgets for my Vietnam trip planning.

🌐 **Live Site**: [widgets.newth.ai](https://widgets.newth.ai)

## About

This is my personal collection of useful widgets that I've built for specific needs:

- **Vietnam Trip Planning**: Weather widgets for tracking forecasts in Hanoi, Ho Chi Minh City, and Ha Long Bay
- **Documentation Tools**: Various utilities for project documentation
- **Personal Projects**: Custom widgets for specific use cases

## Current Widgets

### Vietnam Trip Planning

- **Vietnam Weather Overview** - Complete dashboard with all three cities
- **Hanoi Weather** - Northern Vietnam forecast
- **Ho Chi Minh City Weather** - Southern Vietnam (Saigon) forecast
- **Ha Long Bay Weather** - Perfect for planning boat trips

## Embedding Widgets

Each widget can be embedded individually:

```html
<!-- Vietnam Overview -->
<iframe src="https://widgets.newth.ai/weather-vietnam" width="100%" height="600"></iframe>

<!-- Individual Cities -->
<iframe src="https://widgets.newth.ai/vietnam/hanoi" width="100%" height="500"></iframe>
<iframe src="https://widgets.newth.ai/vietnam/hochiminh" width="100%" height="500"></iframe>
<iframe src="https://widgets.newth.ai/vietnam/halongbay" width="100%" height="500"></iframe>
```

## Tech Stack

- **React** + **TypeScript** - Core framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Vercel** - Hosting and deployment

## Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys if needed

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── WidgetCard.tsx  # Widget display component
│   └── WidgetGrid.tsx  # Grid layout component
├── pages/              # Page components
├── constants/          # Widget definitions and data
├── services/           # API services (weather data)
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Features

- 🎨 **Modern Design** - Built with shadcn/ui design system
- 📱 **Responsive** - Works on all device sizes
- ♿ **Accessible** - ARIA attributes and keyboard navigation
- 🧪 **Well Tested** - Comprehensive test suite with Vitest
- 🚀 **Fast** - Optimized builds with Vite
- 🔗 **Embeddable** - Clean widget URLs for embedding

## License

Personal project - feel free to explore and use for inspiration!

## Development Workflow

- **Format on Save**: Enabled via VSCode workspace settings and Prettier
- **Consistent Style**: Enforced with .editorconfig
- **Linting**: `npm run lint` (auto-fix: `npm run lint:fix`)
- **Formatting**: `npm run format`
- **Type Checking**: `npm run type-check`
- **Tests**: `npm run test`, `npm run test:watch`
- **Pre-commit Checks**: Automated with Husky and lint-staged

### Recommended Extensions

- Prettier
- Tailwind CSS IntelliSense
- TypeScript Next
