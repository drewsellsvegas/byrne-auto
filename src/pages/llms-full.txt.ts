import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { services } from '../data/services';
import { absUrl } from '../lib/paths';

export const GET: APIRoute = () => {
  const out = [
    `# ${site.name}: full content`,
    '',
    `${site.name} is an auto repair and performance shop at ${site.address.full}. Phone ${site.phone.display}. Email ${site.email}. Hours: ${site.hours.display}; ${site.hours.detail}.`,
    'Authorized dealer/installer: Dynojet (UTV), FRP, BTR (Brian Tooley Racing), Whipple Superchargers, Rough Country, Texas Speed, JLT intakes, S&B filters.',
    '',
    ...services.flatMap((s) => [
      `## ${s.name}`,
      `URL: ${absUrl(`/services/${s.slug}`)}`,
      '',
      s.lead,
      '',
      ...s.body,
      '',
      `What's included: ${s.includes.join('; ')}.`,
      '',
      'FAQ:',
      ...s.faq.map((f) => `- ${f.q} ${f.a}`),
      '',
    ]),
  ];
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
