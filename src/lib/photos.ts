import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.jpg', { eager: true });
const byName: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(all)) byName[path.split('/').pop()!.replace('.jpg', '')] = mod.default;

export const photo = (name: string): ImageMetadata => {
  const p = byName[name];
  if (!p) throw new Error(`Missing photo: ${name}`);
  return p;
};
export const photoNames = Object.keys(byName);
