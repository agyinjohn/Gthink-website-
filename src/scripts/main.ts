import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { initWeave } from './weave';

gsap.registerPlugin(ScrollTrigger, SplitText);

const html = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s as any) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s as any)) as T[];
const store = {
  get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch {} },
  del: (k: string) => { try { sessionStorage.removeItem(k); } catch {} },
};

/* ------------------------------------------------------------------ */
/* Smooth scroll                                                       */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.12, touchMultiplier: 1.3 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollTo = (target: number | HTMLElement) => {
  if (lenis) lenis.scrollTo(target as any, { duration: 1.2, offset: typeof target === 'number' ? 0 : -110 });
  else if (typeof target === 'number') window.scrollTo({ top: target });
  else target.scrollIntoView();
};

$$<HTMLAnchorElement>('a[href*="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const el = $(url.hash);
    if (!el) return;
    e.preventDefault();
    scrollTo(el);
    history.replaceState(null, '', url.hash);
  });
});

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */
const header = $('[data-header]');
let lastY = 0;
const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 30);
  if (!html.classList.contains('menu-open')) header?.classList.toggle('is-hidden', y > 400 && y > lastY + 2);
  lastY = y;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const clock = $('[data-clock]');
const tick = () => {
  if (clock) clock.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Accra' });
};
tick();
setInterval(tick, 20000);

const burger = $('[data-burger]');
const mm = $('[data-mm]');
if (burger && mm) {
  const links = $$('.mm__list a, .mm__foot > *', mm);
  const tl = gsap.timeline({ paused: true })
    .set(mm, { visibility: 'visible' })
    .to($('.mm__bg', mm), { scaleY: 1, duration: 0.6, ease: 'expo.inOut' })
    .from(links, { y: 30, opacity: 0, duration: 0.6, stagger: 0.04, ease: 'expo.out' }, '-=0.2');
  const toggle = (open: boolean) => {
    html.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mm.setAttribute('aria-hidden', String(!open));
    if (open) { header?.classList.remove('is-hidden'); lenis?.stop(); tl.timeScale(1).play(); }
    else { lenis?.start(); tl.timeScale(1.8).reverse(); }
  };
  burger.addEventListener('click', () => toggle(!html.classList.contains('menu-open')));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && html.classList.contains('menu-open') && toggle(false));
}

/* ------------------------------------------------------------------ */
/* Page transitions: navy + blue panels                                 */
/* ------------------------------------------------------------------ */
const curtain = $('[data-curtain]');
const panels = curtain ? $$('i', curtain) : [];
const arriving = store.get('gt-trans') === '1';
store.del('gt-trans');

if (curtain && arriving && !reduce) {
  gsap.set(panels, { scaleY: 1, transformOrigin: 'top' });
  gsap.to(panels, { scaleY: 0, duration: 0.7, ease: 'expo.inOut', stagger: { each: 0.08, from: 'end' } });
}

document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null;
  if (!a || reduce || !curtain) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  if (a.target === '_blank' || a.hasAttribute('download')) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.pathname === location.pathname) return;
  e.preventDefault();
  store.set('gt-trans', '1');
  gsap.set(panels, { transformOrigin: 'bottom' });
  gsap.to(panels, { scaleY: 1, duration: 0.55, ease: 'expo.inOut', stagger: 0.08, onComplete: () => { location.href = url.href; } });
});
window.addEventListener('pageshow', (e) => { if ((e as PageTransitionEvent).persisted) gsap.set(panels, { scaleY: 0 }); });

/* ------------------------------------------------------------------ */
/* First-visit intro: logo, progress line, wipe                         */
/* ------------------------------------------------------------------ */
const intro = (): Promise<void> =>
  new Promise((resolve) => {
    const pre = $('[data-pre]');
    const done = () => { html.classList.remove('first-load'); store.set('gt-loaded', '1'); };
    if (!pre || !html.classList.contains('first-load') || reduce) { done(); return resolve(); }
    lenis?.stop();
    gsap.timeline({ onComplete: () => { done(); lenis?.start(); } })
      .from($('.pre__logo img', pre), { yPercent: 110, duration: 0.8, ease: 'expo.out' })
      .to($('[data-pre-bar]', pre), { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.1)
      .to($('.pre__logo img', pre), { yPercent: -110, duration: 0.5, ease: 'expo.in' }, '+=0.1')
      .add(() => resolve(), '-=0.1')
      .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '-=0.15');
  });

/* ------------------------------------------------------------------ */
/* Reveals                                                              */
/* ------------------------------------------------------------------ */
const reveals = (heroDelay = 0) => {
  if (reduce) { $$('[data-split]').forEach((el) => el.classList.add('is-split')); return; }

  $$('[data-split]').forEach((el) => {
    const hero = el.dataset.split === 'hero';
    SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit(self) {
        el.classList.add('is-split');
        return gsap.from(self.lines, {
          yPercent: 105, duration: 1, ease: 'expo.out', stagger: 0.08,
          delay: hero ? heroDelay : 0,
          scrollTrigger: hero ? undefined : { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
  });

  $$('[data-reveal]').forEach((el) => {
    const hero = el.dataset.reveal === 'hero';
    const d = Number(el.dataset.delay ?? 0);
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
      delay: hero ? heroDelay + 0.3 + d : d,
      scrollTrigger: hero ? undefined : { trigger: el, start: 'top 90%', once: true },
    });
  });

  $$('[data-stagger]').forEach((group) => {
    gsap.from(Array.from(group.children), {
      y: 30, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: group, start: 'top 88%', once: true },
    });
  });

  $$('[data-draw]').forEach((el) => {
    gsap.from(el, { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });

  $$('[data-parallax]').forEach((el) => {
    const amt = Number(el.dataset.parallax || 0.1);
    gsap.fromTo(el, { yPercent: -amt * 100 }, { yPercent: amt * 100, ease: 'none', scrollTrigger: { trigger: el.parentElement || el, scrub: true, start: 'top bottom', end: 'bottom top' } });
  });

  // counters — only for verified numbers
  $$('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count);
    if (!Number.isFinite(to)) return;
    const o = { v: 0 };
    gsap.to(o, {
      v: to, duration: 1.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString('en-GB')),
    });
  });
};

/* ------------------------------------------------------------------ */
/* Marquees                                                             */
/* ------------------------------------------------------------------ */
const marquees = () => {
  $$('[data-marquee]').forEach((m) => {
    const track = $('.marquee__track', m);
    if (!track || reduce) return;
    track.innerHTML += track.innerHTML;
    const speed = Number(m.dataset.speed || 40);
    let x = 0;
    let half = track.scrollWidth / 2;
    window.addEventListener('resize', () => (half = track.scrollWidth / 2));
    gsap.ticker.add((_t, dt) => {
      x -= (speed * dt) / 1000;
      if (x <= -half) x += half;
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
  });
};

/* ------------------------------------------------------------------ */
/* Forms (static site: post to configured endpoint, else guide user)    */
/* ------------------------------------------------------------------ */
const forms = () => {
  $$<HTMLFormElement>('form[data-form]').forEach((f) => {
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const note = $('[data-note]', f);
      const hp = f.querySelector<HTMLInputElement>('input[name="company_website"]');
      if (hp && hp.value) return;
      const action = f.getAttribute('action');
      const btn = f.querySelector<HTMLButtonElement>('[type="submit"]');
      if (!action || action === '#') {
        if (note) note.textContent = 'Thanks. Online forms go live at launch. Until then, please use the WhatsApp button or call us.';
        return;
      }
      if (btn) btn.disabled = true;
      try {
        const res = await fetch(action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error();
        f.reset();
        if (note) note.textContent = f.dataset.form === 'newsletter' ? 'Subscribed. Thank you.' : 'Thank you. We will be in touch within one business day.';
      } catch {
        if (note) note.textContent = 'That did not go through. Please try WhatsApp or call us instead.';
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  });
};

/* ------------------------------------------------------------------ */
/* Simple filters (case studies, shop)                                  */
/* ------------------------------------------------------------------ */
const filters = () => {
  $$('[data-filters]').forEach((group) => {
    const btns = $$<HTMLButtonElement>('[data-filter]', group);
    const items = $$(`[data-filter-item]`);
    btns.forEach((b) => b.addEventListener('click', () => {
      btns.forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      const f = b.dataset.filter!;
      items.forEach((it) => { it.hidden = !(f === 'All' || (it.dataset.filterItem || '').split('|').includes(f)); });
      ScrollTrigger.refresh();
    }));
  });
};

/* ------------------------------------------------------------------ */
/* Cookie consent                                                       */
/* ------------------------------------------------------------------ */
const cookies = () => {
  const box = $('[data-cookie]');
  if (!box) return;
  let choice: string | null = null;
  try { choice = localStorage.getItem('gt-cookie'); } catch {}
  if (choice) return;
  box.hidden = false;
  if (!reduce) gsap.from(box, { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out', delay: 1.6 });
  $$('[data-cookie-choice]', box).forEach((b) => b.addEventListener('click', () => {
    try { localStorage.setItem('gt-cookie', b.dataset.cookieChoice!); } catch {}
    gsap.to(box, { y: 20, opacity: 0, duration: 0.4, ease: 'power3.in', onComplete: () => { box.hidden = true; } });
  }));
};

/* ------------------------------------------------------------------ */
/* Boot                                                                 */
/* ------------------------------------------------------------------ */
$$('[data-totop]').forEach((b) => b.addEventListener('click', () => scrollTo(0)));

const boot = async () => {
  await document.fonts.ready.catch(() => {});
  marquees();
  forms();
  filters();
  const firstLoad = html.classList.contains('first-load');
  const weaveEl = $<HTMLCanvasElement>('[data-weave]');
  const weave = weaveEl ? initWeave(weaveEl, reduce) : null;
  await intro();
  reveals(firstLoad ? 0.05 : arriving ? 0.35 : 0.1);
  weave?.enter(firstLoad ? 0 : 0.2);
  cookies();
  ScrollTrigger.refresh();
};
boot();
