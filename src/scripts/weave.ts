import gsap from 'gsap';

/**
 * The hero "loom": three weft threads (technology, brand, print) weaving
 * over and under a field of warp threads. The pointer tugs the threads.
 */
export function initWeave(canvas: HTMLCanvasElement, reduce: boolean) {
  const ctx = canvas.getContext('2d')!;
  const css = getComputedStyle(document.documentElement);
  const C = {
    bg: css.getPropertyValue('--navy-deep').trim() || '#072f43',
    warp: '#e7f0f5',
    threads: [
      { c: css.getPropertyValue('--blue').trim() || '#0a7fae' },
      { c: css.getPropertyValue('--sky').trim() || '#7cc6e6' },
      { c: '#ffffff' },
    ],
  };

  let w = 0, h = 0, dpr = 1;
  const state = { t: 0, reveal: 0, mx: 0.5, my: 0.5, tmx: 0.5, tmy: 0.5, pull: 0, tpull: 0, scroll: 0 };

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const yAt = (j: number, x: number) => {
    const base = h * (0.28 + j * 0.22);
    const amp = h * (0.13 + 0.03 * j) * (1 + state.pull * 0.6);
    const k = (Math.PI * 2) / (w * (0.55 + j * 0.12));
    const phase = state.t * (0.25 + j * 0.06) + j * 1.9 + state.scroll * 2;
    // pointer pulls nearby thread sections toward it
    const dx = (x - state.mx * w) / (w * 0.22);
    const tug = Math.exp(-dx * dx) * (state.my * h - base) * 0.35 * state.pull;
    return base + Math.sin(x * k + phase) * amp + tug;
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, w, h);

    const spacing = Math.max(18, Math.min(30, w / 48));
    const ww = spacing * 0.42;
    const th = Math.max(26, h * 0.13);
    const revealX = state.reveal * (w + 200) - 100;
    const cols = Math.ceil(w / spacing) + 1;

    // warp, behind
    ctx.fillStyle = 'rgba(231,240,245,0.06)';
    for (let i = 0; i < cols; i++) ctx.fillRect(i * spacing, 0, ww, h);

    // weft threads
    const step = 6;
    C.threads.forEach((tr, j) => {
      ctx.beginPath();
      let x = -10;
      ctx.moveTo(x, yAt(j, x) - th / 2);
      for (; x <= Math.min(w + 10, revealX); x += step) ctx.lineTo(x, yAt(j, x) - th / 2);
      for (x = Math.min(w + 10, revealX); x >= -10; x -= step) ctx.lineTo(x, yAt(j, x) + th / 2);
      ctx.closePath();
      ctx.fillStyle = tr.c;
      ctx.fill();

      // fine weave texture on the thread
      ctx.save();
      ctx.clip();
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 1;
      for (let k = -th / 2 + 4; k < th / 2; k += 5) {
        ctx.beginPath();
        for (x = -10; x <= Math.min(w + 10, revealX); x += 12) {
          const y = yAt(j, x) + k;
          x === -10 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    });

    // warp over weft at alternating crossings
    for (let i = 0; i < cols; i++) {
      const x0 = i * spacing;
      if (x0 > revealX) break;
      C.threads.forEach((_tr, j) => {
        if ((i + j) % 2 !== 0) return;
        const yc = yAt(j, x0 + ww / 2);
        const y0 = yc - th / 2 - 3;
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(x0 - 1.5, y0, ww + 3, th + 6);
        ctx.fillStyle = C.warp;
        ctx.fillRect(x0, y0, ww, th + 6);
      });
    }

  };

  resize();
  window.addEventListener('resize', resize);

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);

  canvas.parentElement?.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    state.tmx = (e.clientX - r.left) / r.width;
    state.tmy = (e.clientY - r.top) / r.height;
    state.tpull = 1;
  });
  canvas.parentElement?.addEventListener('pointerleave', () => (state.tpull = 0));

  const loop = (_t: number, dt: number) => {
    if (!visible) return;
    state.t += (reduce ? 0 : dt) / 1000;
    state.mx += (state.tmx - state.mx) * 0.08;
    state.my += (state.tmy - state.my) * 0.08;
    state.pull += (state.tpull - state.pull) * 0.05;
    const r = canvas.getBoundingClientRect();
    state.scroll = Math.max(0, -r.top / window.innerHeight);
    draw();
  };

  return {
    enter(delay = 0) {
      if (reduce) { state.reveal = 1; draw(); return; }
      gsap.ticker.add(loop);
      gsap.to(state, { reveal: 1, duration: 2.2, ease: 'expo.inOut', delay });
    },
  };
}
