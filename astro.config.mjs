import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://siderust.github.io', // Placeholder
  integrations: [tailwind(), react()],
  base: '/',
});
