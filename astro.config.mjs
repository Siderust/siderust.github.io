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
  build: {
    assets: '_astro',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
