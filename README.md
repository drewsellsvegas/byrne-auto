# Byrne Auto & Performance

Pitch/preview site for Byrne Auto & Performance, 4354 E Alexander Rd, Las Vegas, NV 89115. Static Astro 7 + Tailwind 4. No animation libraries: CSS transitions, a CSS marquee and one small IntersectionObserver. Lighthouse (production build, desktop): Performance 99–100, Accessibility 100, Best Practices 100, SEO 100.

## Commands

| Command | What it does |
| :-- | :-- |
| `npm install` | Install (Node 22.12+) |
| `npm run dev` | Dev server, `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve `dist/` |
| `npm run audit` | Title/meta length, one H1, alt text, broken internal links, JSON-LD on every page |
| `npm run audit:launch` | Same, plus fails while any `[PLACEHOLDER: ...]` is still in the build (expected to fail for the pitch) |
| `npm run assets:brand` | Rebuild favicons, app icons, public logo and OG image |
| `npm run assets:photos` | Re-trim/resize photos from `refs/` (the `refs/` folder is not committed, it is ~250 MB of originals) |

## Where things live

- `src/data/site.ts`: business facts, hours, brands. `src/data/services.ts`: all 17 services (title, meta, H1, copy, FAQs, photo). `src/data/gallery.ts`: gallery photos with alt text.
- Adding a service to `services.ts` automatically creates its page, nav/footer links, sitemap entry, Service + FAQ JSON-LD and llms.txt entries.
- Pages: Home, Services hub, 17 service pages (the 16 requested + **Fleet Maintenance**), Gallery (filter + lightbox), About, Contact (click-to-call, hours, click-to-load map), 404. No service-area pages.
- SEO: AutoRepair/LocalBusiness + WebSite + Service + FAQPage + BreadcrumbList JSON-LD, unique title/meta per page, `sitemap-index.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`.

## Deploy

- **Preview (GitHub Pages):** the workflow builds with `BASE_PATH=/byrne-auto PREVIEW=1`, which adds `noindex` and a disallow-all `robots.txt`.
- **Production (Cloudflare Pages):** build `npm run build`, output `dist`, `NODE_VERSION=22`. Set the real domain in `astro.config.mjs` (`SITE_URL` default) and `url` in `src/data/site.ts`, then submit `/sitemap-index.xml` in Search Console.

## Open placeholders (not known, never invented)

| Item | Where | Needed from client |
| :-- | :-- | :-- |
| Live domain | `astro.config.mjs`, `site.ts` | Confirm `byrneautoperformance.com` (assumed) and apex vs www |
| Reviews | Home (section omitted) | Real reviews with name and permission |
| Owner name, story, years in business | About page (comment in `about.astro`) | A short story and portrait |
| Warranty terms | Transmission rebuilding FAQ (`[PLACEHOLDER: warranty terms]`) | Warranty on rebuilds/installs |
| Fleet account terms, fleet size limits | Fleet Maintenance FAQ | Billing/net terms, scheduling, any size limits |
| Certifications (ASE etc.) | Not shown | Any certifications to display |
| Dyno | Photos show cars on rollers; copy makes no dyno claim | Confirm an in-house dyno, then add dyno-tuning copy |
| Vector logo | Header uses a raster crop of the supplied logo | SVG/AI file if one exists |
| Brand logo quality | All eight logos are in the strip. FRP is a low-res screenshot crop; BTR is cropped from the old site's carbon-fiber photo | A clean FRP logo (transparent PNG/SVG) and a flat BTR logo |
| Google Business Profile URL, other socials | Schema `sameAs` has Facebook only | GBP link, Instagram, etc. |
| Analytics | None installed | Decide (Cloudflare Web Analytics is the lightweight option) |

## Photos

All 43 photos from the old site plus the 17 from the shop folder were reviewed. Letterbox bars were trimmed and everything is served as AVIF/WebP with responsive sizes. Not used: the QR code image (old-site photo 6), duplicate logo/engine files, and a photo of vans lettered for another company (not Byrne's to show). Several shop-folder images are only ~680px wide, so they appear in the gallery/cards and never as full-bleed heroes; higher-res originals would improve them.
