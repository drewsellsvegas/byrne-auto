import type { APIRoute } from 'astro';
import { href } from '../lib/paths';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: 'Byrne Auto & Performance',
      short_name: 'Byrne Auto',
      start_url: href('/'),
      display: 'browser',
      background_color: '#09090b',
      theme_color: '#09090b',
      icons: [
        { src: href('/icon-192.png'), sizes: '192x192', type: 'image/png' },
        { src: href('/icon-512.png'), sizes: '512x512', type: 'image/png' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  );
