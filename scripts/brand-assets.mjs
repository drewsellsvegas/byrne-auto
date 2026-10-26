// Builds favicons, app icons, public logo and the social share image from the cropped logo + a shop photo.
import sharp from 'sharp';
const bg = '#09090b';
const mark = 'src/assets/brand/mark.png';
const sq = async (size, file, pad = 0.14) => {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(mark).resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } }).composite([{ input: m, gravity: 'center' }]).png().toFile(file);
};
await sq(32, 'public/favicon-32.png', 0.04);
await sq(180, 'public/apple-touch-icon.png');
await sq(192, 'public/icon-192.png');
await sq(512, 'public/icon-512.png');
await sharp('public/favicon-32.png').toFile('public/favicon.ico').catch(() => {});
await sharp('src/assets/brand/logo.png').resize({ width: 600 }).png().toFile('public/logo.png');

const W = 1200, H = 630;
const photo = await sharp('src/assets/photos/corvette-lift.jpg').resize(W, H, { fit: 'cover', position: 'right' }).toBuffer();
const shade = Buffer.from(`<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#09090b" stop-opacity="1"/><stop offset=".55" stop-color="#09090b" stop-opacity=".82"/><stop offset="1" stop-color="#09090b" stop-opacity=".1"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/><rect x="0" y="${H - 14}" width="${W}" height="14" fill="#cf2620"/>
<text x="70" y="380" font-family="Arial Narrow, Arial, sans-serif" font-weight="900" font-size="104" fill="#fff" letter-spacing="2">BUILT FOR POWER.</text>
<text x="70" y="480" font-family="Arial Narrow, Arial, sans-serif" font-weight="900" font-size="104" fill="#cf2620" letter-spacing="2">TRUSTED FOR REPAIRS.</text>
<text x="70" y="545" font-family="Arial, sans-serif" font-size="30" fill="#d4d4d8">Las Vegas, NV · (702) 742-0873</text></svg>`);
const logo = await sharp('src/assets/brand/logo.png').resize({ height: 230 }).toBuffer();
await sharp(photo).composite([{ input: shade }, { input: logo, left: 60, top: 40 }]).jpeg({ quality: 86 }).toFile('public/og-default.jpg');
console.log('brand assets done');
