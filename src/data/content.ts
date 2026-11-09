export const insights = [
  { slug: 'it-support-cost-ghana', cat: 'Managed IT', title: 'How much does IT support cost for a small business in Ghana?', excerpt: 'What drives the price, what a fair monthly plan includes, and the hidden costs of having no plan at all.' },
  { slug: 'office-network-upgrade-signs', cat: 'Networks', title: '7 signs your office network needs an upgrade', excerpt: 'Dead zones, afternoon slowdowns and mystery cables. How to tell when patching is no longer enough.' },
  { slug: 'mobile-money-phishing-fraud', cat: 'Cybersecurity', title: 'How to protect your business from Mobile Money and phishing fraud', excerpt: 'The scams we see most often, and the simple controls that stop them.' },
  { slug: 'data-protection-act-business', cat: 'Compliance', title: 'What the Data Protection Act means for your business', excerpt: 'A plain-language guide to Act 843: who it applies to and what you need to do.' },
  { slug: 'custom-vs-off-the-shelf', cat: 'Software', title: 'Custom software or off-the-shelf: how to decide', excerpt: 'Five questions that tell you whether to buy, adapt or build.' },
  { slug: 'choosing-hotel-management-system', cat: 'Hospitality', title: 'Choosing a hotel management system: what to look for', excerpt: 'Bookings, billing and the features that matter for Ghanaian hotels and guest houses.' },
];

// Case studies. Everything in [brackets] is a placeholder until the client approves the story in writing.
export const cases = [
  {
    slug: 'gems-erp-hotel',
    result: '[e.g. Check-in time cut from 10 minutes to 2]',
    client: '[Client name]', sector: 'Hospitality', solution: 'Software · GEMS ERP', filter: 'Software', thread: 'brand',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80&fit=crop',
    summary: 'A GEMS ERP deployment that put bookings, billing and the ledger in one system.',
    timeline: '[X weeks]',
    challenge: '[The challenge in the client’s own words: what was slow, costly or risky before.]',
    steps: ['[Reviewed how the front desk, restaurant and accounts worked]', '[Configured GEMS ERP for rooms, rates and billing]', '[Moved existing records and trained staff]', '[Supported the team through the first month]'],
    results: [{ n: '[X min]', l: 'Average check-in time' }, { n: '[X%]', l: 'Fewer billing errors' }, { n: '[X hrs]', l: 'Saved each week on reconciliation' }],
    quote: '[Client quote focused on a result]', who: '[Name, Title, Company]',
  },
  {
    slug: 'managed-it-client',
    result: '[e.g. IT downtime reduced by X%]',
    client: '[Client name]', sector: '[Industry]', solution: 'Managed IT', filter: 'Managed IT', thread: 'tech',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&fit=crop',
    summary: 'A growing office moved from call-out IT support to one fixed monthly plan.',
    timeline: '[X weeks to onboard]',
    challenge: '[The challenge in the client’s own words.]',
    steps: ['[Audited devices, accounts and backups]', '[Fixed urgent issues and set up monitoring]', '[Moved the team to business email]', '[Started monthly reports and reviews]'],
    results: [{ n: '[X%]', l: 'Less downtime' }, { n: '[X hrs]', l: 'Average response time' }, { n: '[GHS X]', l: 'Saved per year' }],
    quote: '[Client quote focused on a result]', who: '[Name, Title, Company]',
  },
  {
    slug: 'brand-and-print',
    result: '[e.g. One brand across X locations in X weeks]',
    client: '[Client name]', sector: '[Industry]', solution: 'Brand and Print', filter: 'Brand and Print', thread: 'print',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80&fit=crop',
    summary: 'A refreshed identity rolled out across signage, stationery and social media.',
    timeline: '[X weeks]',
    challenge: '[The challenge in the client’s own words.]',
    steps: ['[Workshop on the brand and its customers]', '[Logo refresh and brand guidelines]', '[Stationery, signage and print production]', '[Social media templates and launch]'],
    results: [{ n: '[X]', l: 'Locations rebranded' }, { n: '[X weeks]', l: 'From brief to launch' }, { n: '[X%]', l: 'Growth in social engagement' }],
    quote: '[Client quote focused on a result]', who: '[Name, Title, Company]',
  },
];
export type CaseStudy = (typeof cases)[number];

export const industries = [
  {
    slug: 'hospitality', name: 'Hospitality', body: 'Hotel management with GEMS ERP, POS and guest Wi-Fi.',
    tags: ['GEMS ERP', 'POS', 'Guest Wi-Fi'],
    challenges: ['Bookings, billing and the restaurant run on separate systems', 'Guest Wi-Fi that drops or is open to anyone', 'Night audit and reconciliation done by hand'],
    solutions: ['software', 'networks', 'managed-it'],
  },
  {
    slug: 'retail', name: 'Retail and E-commerce', body: 'Online stores, inventory and Mobile Money payments.',
    tags: ['Online stores', 'Inventory', 'Mobile Money'],
    challenges: ['Stock counts that never match the till', 'Mobile Money payments reconciled at the end of the day', 'No online store, or one that is hard to update'],
    solutions: ['software', 'cloud', 'brand-print'],
  },
  {
    slug: 'education', name: 'Education', body: 'School management systems and campus networks.',
    tags: ['School systems', 'Campus networks'],
    challenges: ['Fees, results and records kept in spreadsheets', 'Computer labs and staff rooms with unreliable Wi-Fi', 'Student and parent data that needs protecting'],
    solutions: ['software', 'networks', 'cybersecurity'],
  },
  {
    slug: 'healthcare', name: 'Healthcare', body: 'Clinic systems and secure patient data.',
    tags: ['Clinic systems', 'Data protection'],
    challenges: ['Patient records on paper or on a single computer', 'Sensitive data with no backup and no access control', 'Questions about the Data Protection Act'],
    solutions: ['software', 'cybersecurity', 'cloud'],
  },
  {
    slug: 'finance', name: 'Finance and Microfinance', body: 'Secure systems and compliance support.',
    tags: ['Security', 'Compliance'],
    challenges: ['Phishing and Mobile Money fraud aimed at staff', 'Branches that need secure, reliable connections', 'Regulator and audit questions about IT controls'],
    solutions: ['cybersecurity', 'networks', 'managed-it'],
  },
  {
    slug: 'sme', name: 'SMEs and Professional Services', body: 'Affordable all-in-one IT through TBP plans.',
    tags: ['Managed IT', 'Brand and Print'],
    challenges: ['No in-house IT person, so problems wait', 'Personal email accounts used for business', 'A brand that looks different everywhere it appears'],
    solutions: ['managed-it', 'cloud', 'brand-print'],
  },
];

export const plans = [
  {
    name: 'Starter', best: 'Small offices (up to [X] users)', price: 'GHS [XXX]', per: '/ month',
    rows: { Helpdesk: 'Remote, business hours', 'Response time': '[X] hours', Security: 'Antivirus and updates', 'Brand and print': 'Not included', 'Account manager': 'No' },
  },
  {
    name: 'Business', best: 'Growing teams', price: 'GHS [XXX]', per: '/ month', featured: true,
    rows: { Helpdesk: 'Remote and on-site', 'Response time': '[X] hours', Security: 'Plus monitoring and backups', 'Brand and print': 'Social media and print credit', 'Account manager': 'Yes' },
  },
  {
    name: 'Enterprise', best: 'Large or multi-site organisations', price: 'Custom quote', per: '',
    rows: { Helpdesk: 'Priority, extended hours', 'Response time': 'Custom SLA', Security: 'Plus assessments and training', 'Brand and print': 'Full TBP coverage', 'Account manager': 'Dedicated team' },
  },
];
