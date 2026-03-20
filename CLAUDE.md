# Vue 3 + Vuetify Starter - Claude Development Guide

## Stack

- **Vue 3.5+** with Composition API (`<script setup>`)
- **Vuetify 3.12+** - Material Design components
- **TypeScript 5.9+** in strict mode
- **Vite 7** - Build tool with HMR
- **Material Design Icons** (@mdi/font)

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type check without building
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests (single run)
npm run test

# Run tests in watch mode
npm run test:watch

# Lint source files
npm run lint

# Lint and auto-fix
npm run lint:fix
```

## Project Structure

```
src/
├── App.vue          # Root component
├── main.ts          # Entry point (Vuetify plugin setup)
└── vite-env.d.ts    # Type declarations
public/
└── favicon.svg      # Static favicon (served directly by the web server)
```

## Key Patterns

### Component Structure
```vue
<template>
  <v-container>
    <v-btn @click="handleClick">Click me</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const handleClick = () => count.value++
</script>
```

### Using Vuetify Components
- All Vuetify components are auto-imported (no manual imports needed)
- Use `v-` prefix: `<v-btn>`, `<v-card>`, `<v-text-field>`, etc.
- Material Design Icons: `<v-icon icon="mdi-home"></v-icon>`
- **Do NOT** manually import `vuetify/components` or `vuetify/directives` in `main.ts` — this disables tree-shaking and significantly increases bundle size

### Theme Customization
Edit `src/main.ts` to configure themes, colors, and defaults.

### Security Patterns
- Place static assets (favicon, images) in `public/` so they are served correctly
- All external links must include `rel="noopener noreferrer"` and `target="_blank"` to prevent tab-napping and information leakage:
  ```html
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>
  ```
- A Content Security Policy (CSP) is enforced via a meta tag in `index.html`. The directives are required by Vuetify 3:
  - `style-src 'self' 'unsafe-inline'` — Vuetify uses CSS-in-JS that injects inline `<style>` tags at runtime; without `unsafe-inline` all styles silently fail
  - `font-src 'self' data:` — `@mdi/font` packages icons as base64 `data:` URIs; without `data:` icons are not rendered
  - `img-src 'self' data:` — Vuetify may render SVG icons as `data:` URIs
  - `script-src 'self'` — all JS is bundled by Vite; no CDN scripts needed
  - `connect-src 'self'` — no external API calls from the starter template
  - `default-src 'self'` — safe baseline for any unspecified resource types

## Adding Features

### New Components
Create `.vue` files in `src/components/` and import them in your pages.

### Routing (Vue Router)
```bash
npm install vue-router@4
```

### State Management (Pinia)
```bash
npm install pinia
```

## Common Vuetify Components

- **Layout**: `v-app`, `v-main`, `v-container`, `v-row`, `v-col`
- **Navigation**: `v-app-bar`, `v-navigation-drawer`, `v-tabs`
- **Forms**: `v-text-field`, `v-select`, `v-checkbox`, `v-btn`
- **Data**: `v-table`, `v-data-table`, `v-list`, `v-card`
- **Feedback**: `v-alert`, `v-snackbar`, `v-dialog`, `v-progress-circular`

## Resources

- [Vuetify Component API](https://vuetifyjs.com/en/components/all/)
- [Material Design Icons](https://materialdesignicons.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

## Production Build

```bash
npm run build
# Output: dist/
```

Serve `dist/` with any static file server (nginx, Vercel, Netlify, etc.).
