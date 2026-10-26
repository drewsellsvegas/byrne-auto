// Header solid-on-scroll, mobile menu, scroll reveals. No libraries; transform/opacity only.
const header = document.getElementById('site-header');
const setSolid = () => header?.setAttribute('data-solid', String(window.scrollY > 24));
setSolid();
addEventListener('scroll', setSolid, { passive: true });

const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
btn?.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  btn.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  if (menu) menu.hidden = open;
  header?.setAttribute('data-solid', 'true');
});
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu && !menu.hidden) btn?.click();
});

const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
  els.forEach((e) => e.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((e) => io.observe(e));
}
