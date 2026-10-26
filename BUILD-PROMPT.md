# Build prompt: Byrne Auto & Performance

Build a high-end website for Byrne Auto & Performance in this folder. This is a pitch site. It has to look so good the owner can't say no. Follow CLAUDE.md and AGENTS.md, but this file wins where they differ.

## Step 1: Get the photos
Download every URL in refs/image-urls.txt into refs/current-site-photos/ (curl each one). Look at every photo. Sort them into: shop/team, engines/builds, trucks/cars, UTVs, partner logos. Use ALL of them somewhere on the site. Optimize them with Astro's image tools. Logo: use the first image in the list if it is the logo; if no clean logo exists, make a simple wordmark and mark it [PLACEHOLDER: real logo].

## Step 2: Plan
Run the planner agent to write PLAN.md for this client. Then build one task at a time with the builder agent.

## Business facts (only use these, never invent more)
- Name: Byrne Auto & Performance
- Address: 4354 E Alexander Rd, Las Vegas, NV 89115 (one location)
- Phone: (702) 742-0873
- Email: byrneauto@gmail.com
- Hours: Mon-Fri 8am-5pm. Sat & Sun closed.
- Facebook: https://www.facebook.com/BYRNE-Auto-Performance-101600031980798
- Current site: https://www.byrneautoperformance.com (read it for tone and details)
- Authorized dealer/installer: Dynojet (UTV), FRP, BTR (Brian Tooley Racing), Whipple Superchargers, Rough Country, Texas Speed, JLT intakes, S&B filters
- Uses latest diagnostic tech and top-quality parts. Handles major and minor repairs.
- Reviews, years in business, owner name, warranty, certifications: NOT known. Use [PLACEHOLDER: ...] tokens. Never make up reviews.

## Pages
- Home
- Services hub
- One page per service (each its own URL, real useful copy, FAQs, photos, call button):
  1. 50K/100K Mile Tune-Ups
  2. Brake Maintenance
  3. Electrical Repairs
  4. Engine Diagnostics
  5. Suspension Work
  6. Restoration
  7. Oil Changes
  8. A/C Repair
  9. Preventative Maintenance
  10. Transmission Rebuilding
  11. Performance Mods & Tuning
  12. Custom Engine Builds & Installs
  13. Ford 5.0 Tuning (2011 and up)
  14. Whipple Supercharger Installs
  15. UTV Performance (Dynojet)
  16. Lift Kits & Off-Road (Rough Country)
- Gallery (all photos, lightbox)
- About
- Contact (map, hours, click-to-call, click-to-text)
- NO service area pages. Delete the area pages, areas.json, and any area links from the starter.

## Look and feel
- Premium performance-shop feel. Dark theme, bold condensed headings, one strong accent color pulled from their logo/photos.
- Big full-bleed photo hero with a clear "Call (702) 742-0873" button.
- Smooth, tasteful motion: scroll reveals, a photo strip, hover effects. GSAP is OK here, but keep it light and fast. Respect reduced-motion.
- "Brands we install" logo strip with the partner logos.
- Sticky mobile call/text bar. Mobile first. Lighthouse 90+ on all scores.

## SEO
- Local SEO for an auto repair and performance shop in Las Vegas (89115, North Las Vegas area).
- AutoRepair JSON-LD with address, hours, phone. Service schema on each service page. FAQ schema where FAQs exist.
- Unique title and meta on every page. llms.txt, sitemap, robots.txt.

## Finish
- Run npm run build, npm run audit:content, npm run audit:launch (launch audit will fail on placeholders; that's expected for a pitch, list them).
- Update README.md for this client with the list of placeholders still open.
- Create a public GitHub repo under the drewsellsvegas account named byrne-auto and push. Let the GitHub Pages workflow publish a noindex preview. Give me the preview link.
