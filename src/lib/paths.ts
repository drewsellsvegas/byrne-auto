import { site } from '../data/site';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const isPreview = import.meta.env.PREVIEW === '1';
/** Prefix a site path with the deploy base ("/services/x" -> "/byrne-auto/services/x" on the preview). */
export const href = (p: string) => (p === '/' ? `${base}/` : `${base}${p}`);
/** Absolute URL. Uses the configured Astro site so preview and production both resolve correctly. */
export const absUrl = (p: string) => `${(import.meta.env.SITE || site.url).replace(/\/$/, '')}${href(p)}`;
export const tel = `tel:${site.phone.e164}`;
export const sms = (msg = site.smsMessage) => `sms:${site.phone.e164}?&body=${encodeURIComponent(msg)}`;
