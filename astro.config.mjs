// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Production: domain root, indexable. GitHub Pages preview:
//   SITE_URL=https://drewsellsvegas.github.io BASE_PATH=/byrne-auto PREVIEW=1
// [PLACEHOLDER: domain] confirm the live domain, then update `url` in src/data/site.ts as well.
const SITE_URL = (process.env.SITE_URL || 'https://www.byrneautoperformance.com').replace(/\/+$/, '');
const rawBase = (process.env.BASE_PATH || '/').trim();
const BASE_PATH = rawBase === '/' || rawBase === '' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;
const PREVIEW = process.env.PREVIEW === '1' || process.env.PREVIEW === 'true';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [sitemap({ filter: (page) => !/\/404$/.test(page) })],
  image: { layout: 'constrained', responsiveStyles: true },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Barlow Condensed',
      cssVariable: '--font-display',
      weights: [600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial Narrow', 'sans-serif'],
      display: 'swap',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial', 'sans-serif'],
      display: 'swap',
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    define: { 'import.meta.env.PREVIEW': JSON.stringify(PREVIEW ? '1' : '') },
  },
});
