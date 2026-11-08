export type Solution = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  outcome: string;
  intro: string;
  thread: 'tech' | 'brand' | 'print';
  pains: { title: string; body: string }[];
  deliver: string[];
  steps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  extra?: { label: string; href: string };
};

const assessSteps = (build: string, buildBody: string) => [
  { title: 'Listen', body: 'A short call or visit to understand how your business works today and what is getting in the way.' },
  { title: 'Plan', body: 'A written plan with scope, timeline and a fixed quote. No surprises later.' },
  { title: build, body: buildBody },
  { title: 'Support', body: 'The same local team stays on to support, maintain and improve what we delivered.' },
];

export const solutions: Solution[] = [
  {
    slug: 'software',
    name: 'Software and Products',
    short: 'Custom web and mobile apps, plus ready-made systems like GEMS ERP.',
    headline: 'Software built around how your business works.',
    outcome: 'Systems that match your processes, take Mobile Money and grow with you.',
    intro:
      'Off-the-shelf tools rarely fit. We build web and mobile applications and business systems that match your processes, integrate with Mobile Money and grow with you.',
    thread: 'tech',
    pains: [
      { title: 'Spreadsheets everywhere', body: 'Orders, stock and payments live in different files, and nobody trusts the totals.' },
      { title: 'Tools that do not fit', body: 'Imported software forces your team to work around it instead of with it.' },
      { title: 'Payments that do not connect', body: 'Mobile Money collections are reconciled by hand at the end of every day.' },
    ],
    deliver: [
      'Custom web applications and portals',
      'Android and iOS apps',
      'Business systems: ERP, POS, HR, inventory',
      'Mobile Money and payment integration',
      'APIs and system integration',
      'GEMS ERP: ready-made hospitality and business management',
    ],
    steps: assessSteps('Build and test', 'We build in short stages you can see and use, and security-test everything before it goes live.'),
    faqs: [
      { q: 'How long does a custom project take?', a: 'Most business systems take [X to X] weeks. You get a timeline with your quote before any work starts.' },
      { q: 'Can you integrate with Mobile Money?', a: 'Yes. We integrate Mobile Money collections and payouts directly into the systems we build.' },
      { q: 'Who owns the code?', a: '[Ownership and licensing terms to be confirmed].' },
      { q: 'Do you support the software after launch?', a: 'Yes. Support and maintenance can be included on its own or as part of a Managed IT plan.' },
    ],
    seoTitle: 'Custom Software and App Development in Accra | GTHINK',
    extra: { label: 'See GEMS ERP', href: '/solutions/software#gems' },
  },
  {
    slug: 'managed-it',
    name: 'Managed IT (TBP)',
    short: 'Monitoring, helpdesk and maintenance for one fixed monthly fee.',
    headline: 'Your IT department for one monthly fee.',
    outcome: 'Problems fixed fast, or prevented before they happen.',
    intro:
      'No in-house IT team, or one that is stretched thin? We monitor, maintain and support your systems so problems are fixed fast, or never happen.',
    thread: 'tech',
    pains: [
      { title: 'Nobody owns IT', body: 'Problems wait until someone knows someone who can come and look at it.' },
      { title: 'Unpredictable bills', body: 'Every call-out is a new invoice, so IT spending is impossible to plan.' },
      { title: 'No backups you can trust', body: 'One failed laptop or server could lose months of work.' },
    ],
    deliver: [
      'Helpdesk support by phone, WhatsApp, remote and on-site',
      'Monitoring, updates and patching',
      'Backup and recovery',
      'Device and licence management',
      'Monthly report',
      'Optional add-ons: website care, social media, print credit',
    ],
    steps: assessSteps('Onboard', 'We document your systems, fix urgent issues and set up monitoring and backups.'),
    faqs: [
      { q: 'Is there a minimum contract?', a: '[Terms to be confirmed].' },
      { q: 'Can I change plans?', a: 'Yes, you can move up or down as your needs change.' },
      { q: 'Do you support businesses outside Accra?', a: '[Service areas to be confirmed].' },
      { q: 'How do I pay?', a: 'Bank transfer, cheque or Mobile Money.' },
    ],
    seoTitle: 'Managed IT Support Plans in Ghana | GTHINK',
    extra: { label: 'Compare plans', href: '/solutions/managed-it/plans' },
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    short: 'Find and fix weaknesses before attackers do.',
    headline: 'Protect your data, your customers and your reputation.',
    outcome: 'Practical controls, tested defences and a team ready if something goes wrong.',
    intro:
      'Phishing, ransomware and Mobile Money fraud target businesses of every size. We find weaknesses and put practical controls in place.',
    thread: 'tech',
    pains: [
      { title: 'Staff are the easiest way in', body: 'One convincing email is enough to hand over passwords or approve a fake payment.' },
      { title: 'No idea where the gaps are', body: 'You cannot fix weaknesses you have never tested for.' },
      { title: 'Compliance questions', body: 'The Data Protection Act applies to you, but it is not clear what it requires.' },
    ],
    deliver: [
      'Security assessment and vulnerability testing',
      'Firewall and endpoint protection',
      'Secure code review for your applications',
      'Staff awareness training',
      'Incident response support',
      'Data Protection Act (Act 843) readiness',
    ],
    steps: assessSteps('Fix and harden', 'We close the gaps in order of risk and show you exactly what changed.'),
    faqs: [
      { q: 'We are a small business. Are we really a target?', a: 'Yes. Smaller businesses are often targeted precisely because they have fewer defences.' },
      { q: 'Will testing disrupt our systems?', a: 'Testing is planned with you and scheduled to avoid disruption to your operations.' },
      { q: 'Can you help with the Data Protection Act?', a: 'Yes. We review how you collect and store personal data and help you put the right controls and policies in place.' },
    ],
    seoTitle: 'Cybersecurity Services for Businesses in Ghana | GTHINK',
  },
  {
    slug: 'networks',
    name: 'Networks and Infrastructure',
    short: 'Reliable office networks, servers and Wi-Fi.',
    headline: 'A network your team can depend on.',
    outcome: 'Fast, stable connections that are designed, installed and maintained properly.',
    intro:
      'Slow Wi-Fi and dropped connections cost hours every week. We design, install and maintain networks that just work.',
    thread: 'tech',
    pains: [
      { title: 'Dead zones and drop-outs', body: 'Wi-Fi works at reception and nowhere else.' },
      { title: 'Cabling nobody understands', body: 'Years of quick fixes mean nobody knows which cable goes where.' },
      { title: 'Everything slows at peak time', body: 'The network was never designed for the number of people now using it.' },
    ],
    deliver: [
      'Structured cabling',
      'LAN, Wi-Fi and VPN',
      'Servers and storage',
      'CCTV and access control [confirm]',
      'Network monitoring',
    ],
    steps: assessSteps('Install', 'Clean, labelled installation, scheduled around your working hours.'),
    faqs: [
      { q: 'Can you work outside office hours?', a: 'Yes. Installations can be scheduled for evenings or weekends to avoid disruption.' },
      { q: 'Do you provide the equipment?', a: 'Yes. We supply genuine equipment through our shop, or work with hardware you already own.' },
      { q: 'Do you cover multiple sites?', a: '[Service areas to be confirmed].' },
    ],
    seoTitle: 'Office Networks and Wi-Fi Installation in Accra | GTHINK',
  },
  {
    slug: 'cloud',
    name: 'Cloud and Hosting',
    short: 'Business email, hosting, backups and migration.',
    headline: 'Work securely from anywhere.',
    outcome: 'Email, files and applications in the cloud, with backups you can rely on.',
    intro:
      'Move email, files and applications to the cloud without disruption, with backups you can rely on.',
    thread: 'tech',
    pains: [
      { title: 'Personal email for business', body: 'Staff use free accounts, and the business loses access when they leave.' },
      { title: 'Files on one machine', body: 'Important documents live on a single laptop with no copy anywhere else.' },
      { title: 'A website that keeps going down', body: 'Cheap hosting with no one watching it.' },
    ],
    deliver: [
      'Business email (Google Workspace, Microsoft 365)',
      'Website and application hosting',
      'Domains and SSL',
      'Cloud migration',
      'Automated backups',
    ],
    steps: assessSteps('Migrate', 'We move your email and files in stages so nothing is lost and nobody stops working.'),
    faqs: [
      { q: 'Google Workspace or Microsoft 365?', a: 'It depends on how your team works. We recommend one in your plan and explain why.' },
      { q: 'Will we lose emails during migration?', a: 'No. Existing email is copied across before the switch.' },
      { q: 'Where is our data stored?', a: '[Hosting locations to be confirmed].' },
    ],
    seoTitle: 'Business Email, Cloud and Hosting in Ghana | GTHINK',
  },
  {
    slug: 'brand-print',
    name: 'Brand and Print',
    short: 'Brand identity, digital marketing and corporate printing.',
    headline: 'Look as professional as you are.',
    outcome: 'One consistent brand, from your logo to your next campaign to the card in your hand.',
    intro:
      'From your logo to your next campaign and the materials you hand to customers, we keep your brand consistent everywhere.',
    thread: 'brand',
    pains: [
      { title: 'Five suppliers, five styles', body: 'Your website, flyers and social posts all look like different companies.' },
      { title: 'Social media goes quiet', body: 'Posting stops whenever the person who handled it gets busy.' },
      { title: 'Print that disappoints', body: 'Colours never match the screen and deadlines slip.' },
    ],
    deliver: [
      'Logo and brand identity',
      'Website design',
      'Social media management and online ads',
      'Business cards, letterheads and stationery',
      'Flyers, brochures, banners and signage',
      'Branded merchandise [confirm range]',
    ],
    steps: assessSteps('Design and produce', 'Concepts, revisions and final files, then printing and delivery handled by the same team.'),
    faqs: [
      { q: 'Can you print designs made by someone else?', a: 'Yes. We check files before printing and tell you if anything needs fixing.' },
      { q: 'What is the turnaround for print?', a: '[Standard print turnaround to be confirmed].' },
      { q: 'Can brand and print be part of a monthly plan?', a: 'Yes. Business and Enterprise Managed IT plans include social media and print credit.' },
    ],
    seoTitle: 'Branding, Design and Corporate Printing in Accra | GTHINK',
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug)!;
