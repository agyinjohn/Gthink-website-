/**
 * Responsive attributes for photos. Unsplash links get a srcset at several
 * widths and `auto=format`, so phones download a small WebP/AVIF instead of
 * the full-size JPEG. Local files (e.g. /hero.jpg) are passed through as-is.
 */
export function imgAttrs(src: string, opts: { widths?: number[]; sizes?: string; quality?: number } = {}) {
  const { widths = [480, 800, 1200, 1600], sizes = '(max-width: 900px) 100vw, 50vw', quality = 72 } = opts;
  if (!src.startsWith('https://images.unsplash.com/')) return { src };
  const at = (w: number) => {
    const u = new URL(src);
    u.searchParams.set('w', String(w));
    u.searchParams.set('q', String(quality));
    u.searchParams.set('fit', 'crop');
    u.searchParams.set('auto', 'format');
    return u.toString();
  };
  return {
    src: at(widths[Math.min(1, widths.length - 1)]),
    srcset: widths.map((w) => `${at(w)} ${w}w`).join(', '),
    sizes,
  };
}

export const heroWidths = [800, 1200, 1600, 2000, 2600];
