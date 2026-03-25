# Vue 3 + Vuetify Starter

A production-ready starter template built with Vue 3, Vuetify 3, TypeScript, and Vite.

## Tech Stack

- **Vue 3.5+** — Composition API with `<script setup>`
- **Vuetify 3.12+** — Material Design component library
- **TypeScript 5.9+** — Strict mode enabled
- **Vite 7** — Build tool with HMR
- **Vitest 4+** — Unit testing with coverage
- **@mdi/font** — Material Design Icons

## Quick Start

```bash
npm install
npm run dev   # http://localhost:5173
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:5173 |
| `npm run build` | Production build (output: `dist/`) |
| `npm run preview` | Preview production build |
| `npm run type-check` | TypeScript validation |
| `npm run lint` | Lint source files |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run test` | Run tests |
| `npm run test -- --coverage` | Tests with coverage (80% thresholds) |

## Project Structure

```
src/
├── App.vue          # Root component
├── App.test.ts      # Tests for App component
├── main.ts          # Entry point — Vuetify plugin setup
├── test-setup.ts    # Vitest global setup
└── vite-env.d.ts    # TypeScript declarations
public/
├── favicon.svg
├── robots.txt
└── sitemap.xml
.github/
└── dependabot.yml   # Automated dependency updates
```

## Customization

### Theme

Edit `src/main.ts` to configure colors, fonts, and component defaults using the Vuetify theme API.

### Routing

```bash
npm install vue-router@4
```

### State Management

```bash
npm install pinia
```

## Deployment

Build the project and serve the `dist/` directory with any static file server:

```bash
npm run build
# Serve dist/ with nginx, Vercel, Netlify, etc.
```

## Resources

- [Vuetify Component API](https://vuetifyjs.com/en/components/all/)
- [Material Design Icons](https://materialdesignicons.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
