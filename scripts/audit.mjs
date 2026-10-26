// Content + SEO audit over dist/: title/meta length, one H1, alt text, internal links, schema, placeholders.
import fs from 'node:fs';
import path from 'node:path';
const dist = 'dist';
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk(dist);
const pages = files.filter((f) => f.endsWith('.html'));
const launch = process.argv.includes('--launch');
const problems = [];
const titles = new Map(), metas = new Map();
const exists = (u) => { const p = u.split('#')[0].split('?')[0]; if (!p || p === '/') return true; const c = [p, p + '.html', p + '/index.html'].map((x) => path.join(dist, x)); return c.some((x) => fs.existsSync(x)); };
for (const f of pages) {
  const h = fs.readFileSync(f, 'utf8');
  const rel = f.replace(dist, '');
  const dec = (x) => x.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  const t = dec((h.match(/<title>(.*?)<\/title>/) || [])[1] || '');
  const m = dec((h.match(/<meta name="description" content="(.*?)"/) || [])[1] || '');
  if (!t || t.length > 60) problems.push(`${rel}: title ${t.length} chars: ${t}`);
  if (!rel.includes('404') && (!m || m.length > 155 || m.length < 70)) problems.push(`${rel}: meta ${m.length} chars`);
  if (titles.has(t)) problems.push(`${rel}: duplicate title with ${titles.get(t)}`); titles.set(t, rel);
  if (metas.has(m)) problems.push(`${rel}: duplicate meta with ${metas.get(m)}`); metas.set(m, rel);
  const h1 = (h.match(/<h1[ >]/g) || []).length;
  if (h1 !== 1) problems.push(`${rel}: ${h1} h1 tags`);
  for (const img of h.match(/<img [^>]*>/g) || []) if (!/\balt\b/.test(img)) problems.push(`${rel}: img without alt`);
  for (const [, u] of h.matchAll(/href="(\/[^"#]*)[^"]*"/g)) if (!/\.(png|ico|xml|txt|webmanifest|jpg)$/.test(u) && !exists(u)) problems.push(`${rel}: broken link ${u}`);
  if (!/application\/ld\+json/.test(h)) problems.push(`${rel}: no JSON-LD`);
  if (launch && /PLACEHOLDER/.test(h)) problems.push(`${rel}: contains PLACEHOLDER`);
}
for (const f of files.filter((x) => /llms|robots|sitemap/.test(x))) if (launch && /PLACEHOLDER/.test(fs.readFileSync(f, 'utf8'))) problems.push(`${f}: contains PLACEHOLDER`);
console.log(`${pages.length} pages checked`);
if (problems.length) { console.log(problems.join('\n')); process.exit(1); } else console.log('clean');
