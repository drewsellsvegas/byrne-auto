import type { APIRoute } from 'astro';
import { absUrl, isPreview } from '../lib/paths';

// Preview builds disallow everything. Production welcomes all crawlers, AI crawlers included.
export const GET: APIRoute = () =>
  new Response(
    (isPreview
      ? ['User-agent: *', 'Disallow: /', '']
      : ['User-agent: *', 'Allow: /', '', `Sitemap: ${absUrl('/sitemap-index.xml')}`, ''].concat([])
    ).join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
