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

### Build

```bash
npm install
npm run build
# Output: dist/
```

The `dist/` directory contains all static assets ready to serve.

### nginx

This is a single-page application — configure nginx to serve `index.html` for all routes:

```nginx
server {
    listen 80;
    root /var/www/your-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

Vercel auto-detects Vite and sets the output directory to `dist/`.

### Netlify

Drag and drop the `dist/` folder at [app.netlify.com](https://app.netlify.com), or use the CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

### GitHub Pages

Set `base` in `vite.config.ts` to match your repository name before building:

```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

Then push `dist/` to the `gh-pages` branch or use the [vite-plugin-gh-pages](https://github.com/cafreeman/vite-plugin-github-pages) package.

### Environment Variables

Prefix variables with `VITE_` to expose them to the client bundle:

```bash
# .env
VITE_API_URL=https://api.example.com
```

Access in code:

```ts
const apiUrl = import.meta.env.VITE_API_URL
```

Variables are baked into the bundle at build time — rebuild after changing `.env` files.

## Resources

- [Vuetify Component API](https://vuetifyjs.com/en/components/all/)
- [Material Design Icons](https://materialdesignicons.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
