# Vue 3 + Vuetify Starter Template

A modern, production-ready starter template with Vue 3, Vuetify 3, TypeScript, and Vite.

## Features

- **Vue 3** - Composition API with `<script setup>`
- **Vuetify 3** - Material Design component framework
- **TypeScript** - Full type safety
- **Vite** - Lightning-fast HMR and builds
- **Material Design Icons** - Complete icon set

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── eslint.config.js     # ESLint flat config (required for ESLint v9+)
├── src/
│   ├── App.vue          # Root component
│   ├── App.test.ts      # Vitest tests for App component
│   ├── main.ts          # App entry point with Vuetify setup
│   ├── test-setup.ts    # Vitest global setup (ResizeObserver polyfill)
│   └── vite-env.d.ts    # TypeScript declarations
├── public/
│   ├── favicon.svg      # Static favicon (served directly by the web server)
│   └── robots.txt       # Search engine crawl rules
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config
└── package.json
```

## Customization

### Theme
Edit `src/main.ts` to customize the Vuetify theme:

```typescript
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark', // or 'light'
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          // ... more colors
        }
      }
    }
  }
})
```

### Icons
This template uses Material Design Icons (@mdi/font). Browse available icons at [materialdesignicons.com](https://materialdesignicons.com/).

## Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Vuetify 3 Documentation](https://vuetifyjs.com/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

MIT
