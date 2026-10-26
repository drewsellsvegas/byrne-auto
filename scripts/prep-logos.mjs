// Cleans the supplied partner logos into uniform PNGs for the rotating "Authorized dealer" strip.
import sharp from 'sharp';
const out = 'src/assets/brands/';
const sup = 'refs/logos/';

// Dynojet (white/red on black) and BTR (logo on carbon fiber, from the old site photo)
await sharp(sup + 'dynojet.webp').trim({ background: '#000', threshold: 40 }).png().toFile(out + 'dynojet.png');
{
  const cut = await sharp('refs/current-site-photos/p23.jpg').extract({ left: 20, top: 265, width: 840, height: 400 }).toBuffer();
  await sharp(cut).png().toFile(out + 'btr.png');
}
// FRP: white wordmark on black, cropped out of a nav screenshot.
{
  const cut = await sharp(sup + '4.png').flatten({ background: '#000' }).extract({ left: 30, top: 12, width: 190, height: 34 }).toBuffer();
  await sharp(cut).trim({ background: '#000', threshold: 60 }).png().toFile(out + 'frp.png');
}
// Client-supplied logo files (transparent or white-background originals)
await sharp(sup + 'whipple.png').trim().png().toFile(out + 'whipple.png');
await sharp(sup + 'texas.webp').trim().png().toFile(out + 'texas-speed.png');
await sharp(sup + 'jlt.webp').trim().png().toFile(out + 'jlt.png');
await sharp(sup + 'sb.avif').trim().png().toFile(out + 'sb.png');
await sharp(sup + 'rough-country.jpg').trim({ background: '#fff', threshold: 25 }).png().toFile(out + 'rough-country.png');
console.log('logos ready');
