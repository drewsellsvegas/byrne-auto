import { site, brands } from '../data/site';
import { services, type Service } from '../data/services';
import { absUrl } from './paths';

export type Node = Record<string, unknown>;
const bizId = () => `${absUrl('/')}#business`;

export const localBusiness = (): Node => ({
  '@type': ['AutoRepair', 'LocalBusiness'],
  '@id': bizId(),
  name: site.name,
  url: absUrl('/'),
  telephone: site.phone.schema,
  email: site.email,
  image: absUrl('/og-default.jpg'),
  logo: absUrl('/logo.png'),
  description:
    'Auto repair and performance shop in Las Vegas, NV. Maintenance, diagnostics, transmission rebuilding, custom engine builds, Whipple supercharger installs, UTV performance and fleet maintenance.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.zip,
    addressCountry: 'US',
  },
  hasMap: `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}`,
  openingHoursSpecification: site.hours.schema.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  areaServed: site.areas.map((name) => ({ '@type': 'City', name })),
  sameAs: [site.facebook],
  knowsAbout: [...brands.map((b) => b.name), 'Transmission rebuilding', 'Engine building', 'Supercharger installation', 'Fleet maintenance'],
  makesOffer: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: absUrl(`/services/${s.slug}`) } })),
});

export const webSite = (): Node => ({
  '@type': 'WebSite',
  '@id': `${absUrl('/')}#website`,
  url: absUrl('/'),
  name: site.name,
  publisher: { '@id': bizId() },
});

export const serviceNode = (s: Service): Node => ({
  '@type': 'Service',
  '@id': `${absUrl(`/services/${s.slug}`)}#service`,
  name: s.name,
  serviceType: s.name,
  url: absUrl(`/services/${s.slug}`),
  description: s.meta,
  provider: { '@id': bizId() },
  areaServed: site.areas.map((name) => ({ '@type': 'City', name })),
});

export const faqNode = (faq: { q: string; a: string }[]): Node => ({
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const breadcrumbs = (trail: { name: string; path: string }[]): Node => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absUrl(c.path) })),
});

export const graph = (nodes: (Node | undefined)[]) => ({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });
