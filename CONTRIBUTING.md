# Contributing to Newth.ai Widgets

Thank you for your interest in contributing! This project is designed for a fast, modern, and consistent developer experience.

## Getting Started

1. **Clone the repo**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys if needed
   ```
4. **Start the dev server**:
   ```bash
   npm run dev
   ```

## Workflow & Scripts

- **Lint**: `npm run lint` (auto-fix: `npm run lint:fix`)
- **Format**: `npm run format`
- **Type Check**: `npm run type-check`
- **Test**: `npm run test` (watch: `npm run test:watch`)
- **Build**: `npm run build`
- **Pre-commit**: Husky + lint-staged auto-run lint/format on staged files

## Editor Setup

- **Format on Save**: Enabled by default (see .vscode/settings.json)
- **Recommended Extensions**: Prettier, Tailwind CSS IntelliSense, TypeScript Next, ESLint
- **Consistent Style**: Enforced with .editorconfig and Prettier

## Adding a Widget

1. Add widget definition to `src/constants/widgets.ts`
2. Create a React component in `src/pages/`
3. Add a route in `src/App.tsx`
4. Add/extend TypeScript types as needed
5. Add tests in `src/pages/__tests__/` or relevant test folder
6. Ensure category is set and implementation is complete

## Commit & Push

- All changes are auto-formatted and linted before commit
- Use descriptive commit messages (conventional commits format preferred)
- Pushing to `main` auto-deploys to Vercel

## Questions?

Open an issue or contact Oliver (oliver@newth.ai)
