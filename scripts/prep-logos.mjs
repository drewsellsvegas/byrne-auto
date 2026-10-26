// Cleans the supplied partner logos into uniform PNGs for the rotating "Authorized dealer" strip.
import sharp from 'sharp';
const out = 'src/assets/brands/';
const ref = 'refs/current-site-photos/';
const sup = 'refs/logos/';

// Dynojet: keep only the red and black lettering, drop the sand-colored screenshot background.
{
  const { data, info } = await sharp(sup + '2.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const dark = r < 95 && g < 95 && b < 95;
    const red = r > 190 && g < 70 && b < 70;
        data[i + 3] = dark || red ? 255 : 0;
  }
  const clean = await sharp(data, { raw: info }).png().toBuffer();
  const med = await sharp(clean).median(3).png().toBuffer();
  const crop = await sharp(med).extract({ left: 20, top: 24, width: 262, height: 52 }).png().toBuffer();
  await sharp(crop).trim().png().toFile(out + 'dynojet.png');
}
// BTR: black on white, cut off the red underline at the bottom of the screenshot.
{
  const cut = await sharp(sup + '3.png').flatten({ background: '#fff' }).extract({ left: 0, top: 0, width: 233, height: 90 }).toBuffer();
  await sharp(cut).trim({ background: '#fff', threshold: 20 }).png().toFile(out + 'btr.png');
}
// FRP: white wordmark on black, cropped out of a nav screenshot.
{
  const cut = await sharp(sup + '4.png').flatten({ background: '#000' }).extract({ left: 30, top: 12, width: 190, height: 34 }).toBuffer();
  await sharp(cut).trim({ background: '#000', threshold: 60 }).png().toFile(out + 'frp.png');
}
await sharp(ref + 'p33.png').flatten({ background: '#000' }).png().toFile(out + 'whipple.png');
await sharp(ref + 'p34.png').flatten({ background: '#000' }).trim({ background: '#000', threshold: 10 }).png().toFile(out + 'rough-country.png');
await sharp(ref + 'p36.jpg').trim({ background: '#fff', threshold: 25 }).png().toFile(out + 'texas-speed.png');
console.log('logos ready');
