import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://siderust.github.io',
  // For organization sites deployed to username.github.io, no base needed
  // For project sites (username.github.io/repo), set base: '/repo'
  integrations: [
    tailwind(),
  ],
  // i18n: locale routing handled manually via [locale] dynamic routes.
  // See src/i18n/index.ts for supported locales, default locale, and helpers.
  build: {
    assets: '_astro',
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/target/**', '**/.venv/**'],
      },
    },
    build: {
      cssMinify: true,
    },
  },
});
