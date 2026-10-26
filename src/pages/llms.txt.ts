import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { services, groups, type Group } from '../data/services';
import { absUrl } from '../lib/paths';

export const GET: APIRoute = () => {
  const order: Group[] = ['repair', 'performance', 'specialty'];
  const out = [
    `# ${site.name}`,
    '',
    `> Auto repair and performance shop at ${site.address.full}. Maintenance and repair, transmission rebuilding, custom engine builds, Whipple supercharger installs, Ford 5.0 tuning, UTV performance (Dynojet), lift kits and fleet maintenance. Phone ${site.phone.display}. Hours: ${site.hours.display}; ${site.hours.detail}.`,
    '',
    '## Key facts',
    `- Location: ${site.address.full} (one location, serving Las Vegas and North Las Vegas)`,
    `- Phone: ${site.phone.display}`,
    `- Email: ${site.email}`,
    `- Hours: ${site.hours.display}. ${site.hours.detail}.`,
    '- Authorized dealer/installer: Dynojet (UTV), FRP, BTR (Brian Tooley Racing), Whipple Superchargers, Rough Country, Texas Speed, JLT intakes, S&B filters',
    '',
    '## Main pages',
    `- [Home](${absUrl('/')}): Overview of the shop`,
    `- [All services](${absUrl('/services')}): Every service we offer`,
    `- [Gallery](${absUrl('/gallery')}): Photos of builds, installs and customer vehicles`,
    `- [About](${absUrl('/about')}): About the shop`,
    `- [Contact](${absUrl('/contact')}): Address, map, hours, call and text`,
    '',
    ...order.flatMap((g) => [`## ${groups[g].label}`, ...services.filter((s) => s.group === g).map((s) => `- [${s.name}](${absUrl(`/services/${s.slug}`)}): ${s.summary}`), '']),
    '## Optional',
    `- [Full content for AI](${absUrl('/llms-full.txt')})`,
    '',
  ];
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
