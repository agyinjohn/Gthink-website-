import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { initWeave } from './weave';

gsap.registerPlugin(ScrollTrigger, SplitText);

const html = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s as any) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s as any)) as T[];

/* ------------------------------------------------------------------ */
/* Smooth scroll                                                       */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollTo = (target: number | string | HTMLElement) =>
  lenis ? lenis.scrollTo(target as any, { duration: 1.4 }) : typeof target === 'number' ? window.scrollTo({ top: target }) : (typeof target === 'string' ? $(target) : target)?.scrollIntoView();

// in-page anchors
$$<HTMLAnchorElement>('a[href^="#"], a[href*="#"]').forEach((a) => {
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
/* Header: hide on scroll down, clock, mobile menu                     */
/* ------------------------------------------------------------------ */
const header = $('[data-header]');
let lastY = 0;
const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 40);
  if (!html.classList.contains('menu-open')) header?.classList.toggle('is-hidden', y > 300 && y > lastY);
  lastY = y;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const clock = $('[data-clock]');
const tick = () => {
  if (!clock) return;
  const d = new Date();
  clock.textContent = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Accra' });
};
tick();
setInterval(tick, 20000);

const burger = $('[data-burger]');
const mm = $('[data-mm]');
if (burger && mm) {
  const bars = $$('.mm__bg i', mm);
  const links = $$('.mm__list a, .mm__foot > *', mm);
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.inOut' } })
    .set(mm, { visibility: 'visible' })
    .to(bars, { scaleY: 1, duration: 0.8, stagger: 0.07 })
    .from(links, { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.04, ease: 'expo.out' }, '-=0.35');
  const toggle = (open: boolean) => {
    html.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    mm.setAttribute('aria-hidden', String(!open));
    if (open) { header?.classList.remove('is-hidden'); lenis?.stop(); tl.timeScale(1).play(); }
    else { lenis?.start(); tl.timeScale(1.6).reverse(); }
  };
  burger.addEventListener('click', () => toggle(!html.classList.contains('menu-open')));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && html.classList.contains('menu-open') && toggle(false));
}

/* ------------------------------------------------------------------ */
/* Page transitions: four-strip curtain                                 */
/* ------------------------------------------------------------------ */
const curtain = $('[data-curtain]');
const strips = curtain ? $$('i', curtain) : [];
let leaving = false;
try { leaving = sessionStorage.getItem('gt-trans') === '1'; sessionStorage.removeItem('gt-trans'); } catch {}

if (curtain && leaving && !reduce) {
  gsap.set(strips, { scaleY: 1, transformOrigin: 'top' });
  gsap.to(strips, { scaleY: 0, duration: 0.9, ease: 'expo.inOut', stagger: { each: 0.06, from: 'end' }, delay: 0.05 });
}

document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null;
  if (!a || reduce || !curtain) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  if (a.target === '_blank' || a.hasAttribute('download')) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  if (url.pathname === location.pathname) return; // hash links handled above
  e.preventDefault();
  try { sessionStorage.setItem('gt-trans', '1'); } catch {}
  gsap.set(strips, { transformOrigin: 'bottom' });
  gsap.to(strips, {
    scaleY: 1, duration: 0.75, ease: 'expo.inOut', stagger: 0.06,
    onComplete: () => { location.href = url.href; },
  });
});
// bfcache: make sure the curtain is open when coming back
window.addEventListener('pageshow', (e) => { if ((e as PageTransitionEvent).persisted) gsap.set(strips, { scaleY: 0 }); });

/* ------------------------------------------------------------------ */
/* Preloader (first visit per session)                                  */
/* ------------------------------------------------------------------ */
const intro = (): Promise<void> =>
  new Promise((resolve) => {
    const pre = $('[data-pre]');
    if (!pre || !html.classList.contains('first-load') || reduce) {
      html.classList.remove('first-load');
      try { sessionStorage.setItem('gt-loaded', '1'); } catch {}
      return resolve();
    }
    lenis?.stop();
    const count = $('[data-pre-count]', pre)!;
    const n = { v: 0 };
    const threads = $$('.pre__threads i', pre);
    const word = $('.pre__word span', pre)!;
    gsap.timeline({
      onComplete: () => {
        html.classList.remove('first-load');
        try { sessionStorage.setItem('gt-loaded', '1'); } catch {}
        lenis?.start();
      },
    })
      .from(word, { yPercent: 100, duration: 0.9, ease: 'expo.out' })
      .to(n, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => (count.textContent = String(Math.round(n.v)).padStart(3, '0')) }, 0)
      .to(threads, { scaleX: 1, duration: 0.9, ease: 'expo.inOut', stagger: 0.12 }, 0.25)
      .to(word, { yPercent: -110, duration: 0.7, ease: 'expo.in' }, '-=0.2')
      .add(() => resolve(), '-=0.1')
      .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=0.15');
  });

/* ------------------------------------------------------------------ */
/* Text + element reveals                                               */
/* ------------------------------------------------------------------ */
const splitReveal = (el: HTMLElement, immediate = false, delay = 0) => {
  SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'split-line',
    autoSplit: true,
    onSplit(self) {
      el.classList.add('is-split');
      return gsap.from(self.lines, {
        yPercent: 115,
        rotate: 2.5,
        transformOrigin: '0 0',
        duration: 1.25,
        ease: 'expo.out',
        stagger: 0.09,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
      });
    },
  });
};

const reveals = (heroDelay = 0) => {
  if (reduce) {
    $$('[data-split]').forEach((el) => el.classList.add('is-split'));
    return;
  }
  $$('[data-split]').forEach((el) => {
    const hero = el.dataset.split === 'hero';
    splitReveal(el, hero, hero ? heroDelay : 0);
  });

  $$('[data-reveal]').forEach((el) => {
    const hero = el.dataset.reveal === 'hero';
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
      delay: hero ? heroDelay + 0.35 + Number(el.dataset.delay ?? 0) : Number(el.dataset.delay ?? 0),
      scrollTrigger: hero ? undefined : { trigger: el, start: 'top 90%', once: true },
    });
  });

  // grouped stagger
  $$('[data-stagger]').forEach((group) => {
    const items = Array.from(group.children) as HTMLElement[];
    gsap.from(items, {
      y: 40, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  // lines that draw
  $$('[data-draw]').forEach((el) => {
    gsap.from(el, { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });

  // parallax
  $$('[data-parallax]').forEach((el) => {
    const amt = Number(el.dataset.parallax || 0.15);
    gsap.fromTo(el, { yPercent: -amt * 100 }, { yPercent: amt * 100, ease: 'none', scrollTrigger: { trigger: el.parentElement || el, scrub: true, start: 'top bottom', end: 'bottom top' } });
  });

  // counters (only for verified numbers)
  $$('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count);
    if (!Number.isFinite(to)) return;
    const o = { v: 0 };
    gsap.to(o, {
      v: to, duration: 2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString('en-GB')),
    });
  });

  // footer wordmark
  const fw = $('[data-footword]');
  if (fw) {
    gsap.from($$('span', fw), {
      yPercent: 100, scaleY: 1.4, duration: 1.4, ease: 'expo.out', stagger: 0.05,
      scrollTrigger: { trigger: fw, start: 'top 98%', once: true },
    });
  }
};

/* ------------------------------------------------------------------ */
/* Pointer: cursor, magnetic, button fill origin                        */
/* ------------------------------------------------------------------ */
const pointer = () => {
  $$('.btn').forEach((b) => {
    b.addEventListener('pointerenter', (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${e.clientX - r.left}px`);
      b.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
    b.addEventListener('pointerleave', (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${e.clientX - r.left}px`);
      b.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  if (!fine || reduce) return;

  $$('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.36);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });

  const c = $('[data-cursor]');
  const label = $('[data-cursor-label]');
  if (!c || !label) return;
  const cx = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3.out' });
  const cy = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3.out' });
  window.addEventListener('pointermove', (e) => { c.classList.add('is-on'); cx(e.clientX); cy(e.clientY); }, { passive: true });
  document.addEventListener('pointerleave', () => c.classList.remove('is-on'));
  document.addEventListener('pointerover', (e) => {
    const t = e.target as HTMLElement;
    const lab = t.closest<HTMLElement>('[data-cursor-text]');
    if (lab) { label.textContent = lab.dataset.cursorText || ''; c.classList.add('is-label'); c.classList.remove('is-link'); return; }
    c.classList.remove('is-label');
    c.classList.toggle('is-link', !!t.closest('a, button, summary, label, input, textarea, select'));
  });
};

/* ------------------------------------------------------------------ */
/* Marquees that react to scroll velocity                               */
/* ------------------------------------------------------------------ */
const marquees = () => {
  $$('[data-marquee]').forEach((m) => {
    const track = $('.marquee__track', m)!;
    if (!track) return;
    // duplicate content for a seamless loop
    track.innerHTML += track.innerHTML;
    const dir = m.dataset.marquee === 'right' ? 1 : -1;
    const base = Number(m.dataset.speed || 60); // px/s
    let x = 0;
    let boost = 0;
    let half = track.scrollWidth / 2;
    window.addEventListener('resize', () => (half = track.scrollWidth / 2));
    lenis?.on('scroll', (l: Lenis) => { boost = Math.min(Math.abs(l.velocity) * 18, 900); });
    gsap.ticker.add((_t, dt) => {
      if (reduce) return;
      boost *= 0.92;
      x += (dir * (base + boost) * dt) / 1000;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
  });
};

/* ------------------------------------------------------------------ */
/* "Five suppliers → one team" converge scene                           */
/* ------------------------------------------------------------------ */
const converge = () => {
  const sc = $('[data-converge]');
  if (!sc) return;
  const chips = $$('[data-chip]', sc);
  const one = $('[data-one]', sc);
  const a = $('[data-conv-a]', sc);
  const b = $('[data-conv-b]', sc);
  if (reduce) { gsap.set(chips, { opacity: 0 }); gsap.set(one, { scale: 1, opacity: 1 }); gsap.set(a, { opacity: 0 }); gsap.set(b, { opacity: 1, yPercent: 0 }); return; }
  const mm = gsap.matchMedia();
  mm.add('(min-width: 0px)', () => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: { trigger: sc, start: 'top top', end: '+=180%', scrub: 0.8, pin: true },
    });
    tl.from(chips, { scale: 0.6, opacity: 0, stagger: 0.05, duration: 0.4 })
      .to(chips, { left: '50%', top: '50%', rotate: 0, duration: 1, stagger: 0.03 }, '+=0.2')
      .to(chips, { scale: 0.4, opacity: 0, duration: 0.3 }, '-=0.2')
      .fromTo(one, { scale: 0, opacity: 0, rotate: -20 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.6)' }, '<')
      .to(a, { yPercent: -100, opacity: 0, duration: 0.5 }, '<-0.2')
      .fromTo(b, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5 }, '<0.1')
      .to({}, { duration: 0.3 });
  });
};

/* ------------------------------------------------------------------ */
/* Solutions index: floating preview follows the cursor                 */
/* ------------------------------------------------------------------ */
const solList = () => {
  $$('[data-sollist]').forEach((list) => {
    const prev = $('[data-solprev]', list);
    const rows = $$('[data-solrow]', list);
    if (!prev || !fine || reduce) return;
    const xTo = gsap.quickTo(prev, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(prev, 'y', { duration: 0.6, ease: 'power3.out' });
    const rTo = gsap.quickTo(prev, 'rotate', { duration: 0.8, ease: 'power3.out' });
    let lx = 0;
    list.addEventListener('pointermove', (e) => {
      const r = list.getBoundingClientRect();
      const x = e.clientX - r.left;
      xTo(x); yTo(e.clientY - r.top); rTo(gsap.utils.clamp(-12, 12, (x - lx) * 0.6)); lx = x;
    });
    rows.forEach((row, i) => {
      row.addEventListener('pointerenter', () => {
        prev.dataset.active = String(i);
        gsap.to(prev, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' });
        gsap.to($$('[data-prevslide]', prev), { yPercent: -100 * i, duration: 0.7, ease: 'expo.inOut' });
      });
    });
    list.addEventListener('pointerleave', () => gsap.to(prev, { scale: 0.4, opacity: 0, duration: 0.4, ease: 'power3.in' }));
  });
};

/* ------------------------------------------------------------------ */
/* Stacking cards                                                       */
/* ------------------------------------------------------------------ */
const stack = () => {
  if (reduce) return;
  $$('[data-stack]').forEach((wrap) => {
    const cards = $$('[data-stack-card]', wrap);
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.92 + i * 0.02, filter: 'brightness(0.86)', ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 25%', scrub: true },
      });
    });
  });
};

/* ------------------------------------------------------------------ */
/* Horizontal scroll sections                                           */
/* ------------------------------------------------------------------ */
const hscroll = () => {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    $$('[data-hscroll]').forEach((sec) => {
      const track = $('[data-htrack]', sec)!;
      const bar = $('[data-hbar]', sec);
      const dist = () => track.scrollWidth - window.innerWidth + 40;
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: sec, start: 'top top', end: () => `+=${dist()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true,
          onUpdate: (st) => bar && gsap.set(bar, { scaleX: st.progress }),
        },
      });
    });
  });
};

/* ------------------------------------------------------------------ */
/* Tabs (plans teaser)                                                  */
/* ------------------------------------------------------------------ */
const tabs = () => {
  $$('[data-tabs]').forEach((t) => {
    const btns = $$<HTMLButtonElement>('[role="tab"]', t);
    const panels = $$('[role="tabpanel"]', t);
    const ind = $('[data-tab-ind]', t);
    const move = (b: HTMLElement) => ind && gsap.to(ind, { x: b.offsetLeft, width: b.offsetWidth, duration: 0.6, ease: 'expo.out' });
    btns.forEach((b, i) => b.addEventListener('click', () => {
      btns.forEach((x) => x.setAttribute('aria-selected', String(x === b)));
      panels.forEach((p, j) => {
        p.hidden = j !== i;
        if (j === i && !reduce) gsap.from(p.children, { y: 20, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'expo.out' });
      });
      move(b);
    }));
    const sel = btns.find((b) => b.getAttribute('aria-selected') === 'true');
    if (sel) requestAnimationFrame(() => ind && gsap.set(ind, { x: sel.offsetLeft, width: sel.offsetWidth }));
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
      if (hp && hp.value) return; // bot
      const action = f.getAttribute('action');
      const btn = f.querySelector<HTMLButtonElement>('[type="submit"]');
      if (!action || action === '#') {
        if (note) note.textContent = 'Thanks. Online forms go live at launch. Until then, please use the WhatsApp button or call us.';
        return;
      }
      btn && (btn.disabled = true);
      try {
        const res = await fetch(action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error();
        f.reset();
        if (note) note.textContent = f.dataset.form === 'newsletter' ? 'Subscribed. Thank you.' : 'Thank you. We will be in touch within one business day.';
      } catch {
        if (note) note.textContent = 'Something went wrong. Please try WhatsApp or call us instead.';
      } finally {
        btn && (btn.disabled = false);
      }
    });
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
  if (!reduce) gsap.from(box, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', delay: 2.2 });
  $$('[data-cookie-choice]', box).forEach((b) => b.addEventListener('click', () => {
    try { localStorage.setItem('gt-cookie', b.dataset.cookieChoice!); } catch {}
    gsap.to(box, { y: 30, opacity: 0, duration: 0.5, ease: 'power3.in', onComplete: () => { box.hidden = true; } });
  }));
};

/* ------------------------------------------------------------------ */
/* Boot                                                                 */
/* ------------------------------------------------------------------ */
$$('[data-totop]').forEach((b) => b.addEventListener('click', () => scrollTo(0)));

const boot = async () => {
  await document.fonts.ready.catch(() => {});
  pointer();
  marquees();
  forms();
  tabs();
  const firstLoad = html.classList.contains('first-load');
  const weaveEl = $<HTMLCanvasElement>('[data-weave]');
  const weave = weaveEl ? initWeave(weaveEl, reduce) : null;
  await intro();
  reveals(firstLoad ? 0.1 : leaving ? 0.45 : 0.15);
  weave?.enter(firstLoad ? 0 : 0.3);
  converge();
  solList();
  stack();
  hscroll();
  cookies();
  ScrollTrigger.refresh();
};
boot();
