import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://siderust.org',
  // i18n: locale routing handled manually via [locale] dynamic routes.
  // See src/i18n/index.ts for supported locales, default locale, and helpers.
  build: {
    assets: '_astro',
  },
  vite: {
    plugins: [tailwindcss()],
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
