# Vue 3 + Vuetify Starter - Claude Development Guide

## Stack

- **Vue 3.5+** with Composition API (`<script setup>`)
- **Vuetify 3.12+** - Material Design components
- **TypeScript 5.9+** in strict mode
- **Vite 7** - Build tool with HMR
- **Vitest 4+** - Test runner (with `@vitest/coverage-v8`)
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

# Run tests with coverage (thresholds: 80% statements/functions/lines, 70% branches)
npm run test -- --coverage

# Lint source files
npm run lint

# Lint and auto-fix
npm run lint:fix
```

The Node.js version is pinned via `.nvmrc` (matches the `engines` field in `package.json`).

## Project Structure

```
README.md            # User-facing documentation for developers using this starter template
.github/
└── dependabot.yml             # Automated dependency update configuration
.nvmrc               # Node.js version pin (matches engines field in package.json)
.npmrc               # Forces devDependency install under NODE_ENV=production
eslint.config.js     # ESLint flat config (required for ESLint v9+)
src/
├── App.vue          # Root component
├── App.test.ts      # Vitest tests for App component
├── main.ts          # Entry point (Vuetify plugin setup)
├── test-setup.ts    # Vitest global setup (ResizeObserver polyfill)
└── vite-env.d.ts    # TypeScript declarations
public/
├── favicon.svg      # Static favicon (served directly by the web server)
├── robots.txt       # Search engine crawl rules
└── sitemap.xml      # XML sitemap for search engine indexing
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

### Testing Patterns

- Test files (`*.test.ts`, `src/test-setup.ts`) are excluded from `vue-tsc` type checking in `tsconfig.json`. This is intentional: Vitest 4 no longer transitively provides `@types/node`, so Node built-ins in test helpers would fail production type checking. Use `npm run test` to catch test-specific type errors.
- Vitest globals (`test`, `describe`, `expect`, `it`, `beforeEach`, etc.) are available in all test files without explicit imports — configured via `globals: true` in `vite.config.ts` and `"types": ["vitest/globals"]` in `tsconfig.json`.
- To access component state in tests, use `defineExpose()` in `<script setup>` to explicitly expose the refs, reactive objects, and functions you need. Then read them via `wrapper.vm as any` in tests. Do **not** use `(wrapper.vm as any).$.setupState` — that is a private Vue internal and will break across Vue versions:
  ```ts
  // App.vue
  defineExpose({ count, reset })

  // App.test.ts
  const state = wrapper.vm as any
  expect(state.count).toBe(0)
  state.count = 5          // mutate reactive state directly
  state.reset()            // call exposed functions
  ```
- Components inside inactive `v-tabs` panels are lazily rendered. `findComponent()` may return nothing for non-active tabs. Instead, assert that the tab element itself exists rather than querying into the inactive panel:
  ```ts
  // Verify the tab is present without activating it
  expect(wrapper.find('[value="forms"]').exists()).toBe(true)
  ```
- Vuetify teleports snackbar content (including action buttons) outside the component wrapper in JSDOM. `snackbar.find('button')` may return nothing even when the snackbar is visible. Prefer triggering DOM clicks when the button is reachable, and fall back to direct state mutation only when it is not:
  ```ts
  const dismissBtn = snackbar.find('button')
  if (dismissBtn.exists()) {
    await dismissBtn.trigger('click')
  } else {
    // Teleported outside wrapper — exercise the code path directly
    state.snackbarVisible = false
  }
  await wrapper.vm.$nextTick()
  expect(snackbar.props('modelValue')).toBe(false)
  ```

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
