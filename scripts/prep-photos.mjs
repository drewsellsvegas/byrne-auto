// One-off: trims letterbox bars from the client's original photos and writes web-ready masters.
import sharp from 'sharp';
import fs from 'node:fs';
const src = 'refs/current-site-photos/';
const out = 'src/assets/photos/';
fs.mkdirSync(out, { recursive: true });
const map = {
  p08: 'utv-dynojet', p02: 'fleet-row', p03: 'turbo', p04: 'transmission',
  p05: 'supercharger-pulley', p09: 'ford-50-red', p10: 'mustang-50-blue', p11: 'mustang-50-yellow',
  p12: 'challenger-dyno', p13: 'hemi-throttle-body', p14: 'engine-build', p15: 'ram-supercharger',
  p16: 'ram-supercharger-2', p17: 'challenger-purple-halos', p18: 'bay-hellcat', p19: 'corvette-supercharged',
  p20: 'corvette-lift', p21: 'challenger-hood-up', p22: 'charger-orange', p24: 'classic-truck-lift',
  p25: 'challenger-yellow-shop', p26: 'challenger-yellow-engine', p27: 'classic-camaro-lift',
  p28: 'whipple-throttle-body', p29: 'whipple-installed', p30: 'charger-dyno', p31: 'lift-kit-parts',
  p32: 'whipple-supercharger', p35: 'texas-speed-cam-kit', p37: 'turbos', p38: 'hellcat-intake',
  p39: 'jlt-ford-50', p40: 'jlt-hemi-392', p41: 'classic-yellow-lift', p42: 'lifted-truck-night',
};
for (const [id, name] of Object.entries(map)) {
  const f = fs.readdirSync(src).find((x) => x.startsWith(id + '.'));
  const buf = await sharp(src + f).trim({ background: '#000000', threshold: 14 }).toBuffer();
  const meta = await sharp(buf).metadata();
  await sharp(buf).resize({ width: 2200, withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toFile(`${out}${name}.jpg`);
  console.log(name, meta.width + 'x' + meta.height);
}
// Logo (transparent PNG): crop to content bounds, plus a mark-only crop for the header.
{
  const raw = await sharp(src + 'p01.png').removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = raw;
  let minx = 1e9, miny = 1e9, maxx = 0, maxy = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 3;
    if (data[i] + data[i + 1] + data[i + 2] > 120) { minx = Math.min(minx, x); maxx = Math.max(maxx, x); miny = Math.min(miny, y); maxy = Math.max(maxy, y); }
  }
  const pad = 30, w = maxx - minx + 2 * pad, h = maxy - miny + 2 * pad;
  const box = { left: minx - pad, top: miny - pad, width: w, height: h };
  await sharp(src + 'p01.png').extract(box).resize({ width: 900 }).png({ compressionLevel: 9 }).toFile('src/assets/brand/logo.png');
  // mark = the pistons and wrenches, between the BYRNE word and the AUTO & PERFORMANCE line
  await sharp(src + 'p01.png').extract({ left: box.left + Math.round(w * 0.2), top: box.top + Math.round(h * 0.215), width: Math.round(w * 0.6), height: Math.round(h * 0.6) }).resize({ height: 240 }).png({ compressionLevel: 9 }).toFile('src/assets/brand/mark.png');
}

// Second batch: shop photos supplied from the client folder (small originals, never upscaled).
const dsrc = 'refs/desktop-photos/';
const dmap = {
  'unnamed.webp': 'storefront-sign', 'unnamed (6).webp': 'cobra-replica-lift', 'unnamed (3).webp': 'jeep-rock-crawler',
  'unnamed (12).webp': 'chevelle-blue', '2026-05-27 (1).jpg': 'chevy-55-lift', 'unnamed (1).webp': 'challenger-silver-hood',
  'unnamed (2).webp': 'challenger-70-yellow', 'unnamed (7).webp': 'nova-black-lift', 'unnamed (4).webp': 'chevelle-engine-red',
  'unnamed (5).webp': 'holley-ls-intake', 'unnamed (13).webp': 'viper-engine', 'unnamed (14).webp': 'f100-storefront',
  'unnamed (8).webp': 'corvette-red-engine', 'unnamed (9).webp': 'chevelle-engine-blue',
};
for (const [f, name] of Object.entries(dmap)) {
  const buf = await sharp(dsrc + f).trim({ background: '#000000', threshold: 14 }).toBuffer();
  await sharp(buf).jpeg({ quality: 88, mozjpeg: true }).toFile(`${out}${name}.jpg`);
  console.log(name);
}
