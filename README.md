# GTHINK website

Company website for GTHINK Company Limited, Accra. Built from the *GTHINK Website Content Plan* (Nov 2026).

**Stack:** [Astro](https://astro.build) (static site) · [GSAP](https://gsap.com) (ScrollTrigger, SplitText) · [Lenis](https://lenis.darkroom.engineering) smooth scroll · self-hosted fonts (Bricolage Grotesque, Instrument Serif, JetBrains Mono).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Design idea: the weave
GTHINK's promise is three services in one partner: **technology, brand and print**. Each is a coloured thread
(cobalt, signal orange, gold). They are woven together across the site, a nod to kente weaving:

- **Hero loom:** a live canvas where the three threads weave over and under warp threads. The cursor pulls them.
- **First-visit loader:** the threads sweep across and reveal the wordmark.
- **Page transitions:** a four-strip curtain in the brand colours.
- **"Five suppliers → one team":** a pinned scroll scene where five vendor chips collapse into GTHINK.
- Line-by-line headline reveals, a magnetic cursor and buttons, marquees that speed up with scroll velocity,
  stacking cards, a horizontal-scroll industries gallery, and a giant footer wordmark.
- `prefers-reduced-motion` turns the motion off. The site works without JavaScript.

## Placeholders (Part C of the plan)
Anything not yet verified shows on the site as a dashed, italic `[placeholder]`. Nothing unverified is published as fact.

- **Facts and contact details:** `src/data/site.ts`. Set a value and it updates everywhere, including the proof bar
  counters, the WhatsApp links, the phone in the utility bar and the footer.
- **Solutions copy:** `src/data/solutions.ts`
- **Plans, case studies, industries, insights:** `src/data/content.ts`
- **Forms:** set `formEndpoint` in `site.ts` (for example Formspree, or your own API). Until then, forms show a note
  pointing people to WhatsApp or the phone line. Each form has a hidden honeypot field to catch spam bots.
- **Images:** woven-pattern artwork (`src/components/Pattern.astro`) holds the place of photos. Swap in real photography when you have it.
- **Domain:** `site` in `astro.config.mjs`.

## Pages
`/` · `/solutions` · `/solutions/{software,managed-it,cybersecurity,networks,cloud,brand-print}` ·
`/solutions/managed-it/plans` · `/industries` · `/case-studies` · `/about` · `/shop` · `/insights` · `/contact` ·
`/support` · `/legal/{privacy,terms,cookies}` · 404
