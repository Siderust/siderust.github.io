import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const siteUrl = process.env.SITE_URL ?? 'https://siderust.github.io';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const rawBase = process.env.BASE_PATH ?? (repoName ? `/${repoName}` : '/');
const base = rawBase === '/' ? '/' : rawBase.replace(/\/$/, '');
const site = new URL(base === '/' ? '' : base.replace(/^\//, ''), siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`).toString();

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [tailwind(), sitemap()],
});
