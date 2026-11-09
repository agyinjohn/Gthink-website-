/**
 * GTHINK — site-wide facts.
 *
 * Anything left as `null` renders on the site as a visible [placeholder]
 * so nobody publishes a number that has not been verified (see Part C of
 * the content plan). Fill a value in here and it updates everywhere.
 */
export const site = {
  name: 'GTHINK',
  legalName: 'GTHINK Company Limited',
  tagline: 'One partner for your technology, brand and print.',
  city: 'Accra',
  country: 'Ghana',

  // ---- Facts that must be verified before launch ----
  foundedYear: null as number | null,        // e.g. 2015
  clientsSupported: null as number | null,   // e.g. 120
  responseHours: null as number | null,      // guaranteed support response time
  assessmentDays: null as number | null,     // days to send the assessment plan
  starterPriceGHS: null as number | null,    // "IT support from GHS [XXX] per month"
  certification: null as string | null,      // e.g. "ISO 27001" — only if held

  // ---- Contact ----
  phone: null as string | null,              // e.g. "+233 30 000 0000"
  whatsapp: null as string | null,           // digits only, e.g. "233200000000"
  email: null as string | null,              // e.g. "hello@gthink.com.gh"
  helpdesk: null as string | null,
  address: null as string | null,
  gps: null as string | null,                // Ghana Post GPS, GA-XXX-XXXX
  hours: null as string | null,              // e.g. "Mon to Fri, 8am to 5pm"
  remoteToolUrl: null as string | null,
  ticketUrl: null as string | null,

  // ---- Homepage hero background ----
  // Image is always used (and is the video's poster frame). To use your own,
  // put the file in /public (e.g. /hero.jpg) and set the path here.
  heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=2000&q=80&fit=crop',
  heroImageAlt: 'A team working together at computers in an office',
  // Optional looping video, e.g. '/hero.mp4' (muted, about 10 to 20 seconds, under 8 MB).
  heroVideo: null as string | null,

  // Form endpoint (e.g. Formspree / your own API). Leave null until ready.
  formEndpoint: null as string | null,

  social: [
    { label: 'LinkedIn', href: null as string | null },
    { label: 'Instagram', href: null as string | null },
    { label: 'Facebook', href: null as string | null },
    { label: 'X', href: null as string | null },
  ],

  ceo: { name: 'Solomon Owuraku Ashia', role: 'Chief Executive Officer' },
};

export const whatsappHref = (text = 'Hello GTHINK, I would like to talk about') =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
    : '/contact#enquiry';

export const nav = [
  { label: 'Solutions', href: '/solutions', mega: true },
  { label: 'Industries', href: '/industries' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];
