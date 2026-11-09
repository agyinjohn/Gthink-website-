export const insights = [
  { slug: 'it-support-cost-ghana', cat: 'Managed IT', title: 'How much does IT support cost for a small business in Ghana?', excerpt: 'What drives the price, what a fair monthly plan includes, and the hidden costs of having no plan at all.' },
  { slug: 'office-network-upgrade-signs', cat: 'Networks', title: '7 signs your office network needs an upgrade', excerpt: 'Dead zones, afternoon slowdowns and mystery cables. How to tell when patching is no longer enough.' },
  { slug: 'mobile-money-phishing-fraud', cat: 'Cybersecurity', title: 'How to protect your business from Mobile Money and phishing fraud', excerpt: 'The scams we see most often, and the simple controls that stop them.' },
  { slug: 'data-protection-act-business', cat: 'Compliance', title: 'What the Data Protection Act means for your business', excerpt: 'A plain-language guide to Act 843: who it applies to and what you need to do.' },
  { slug: 'custom-vs-off-the-shelf', cat: 'Software', title: 'Custom software or off-the-shelf: how to decide', excerpt: 'Five questions that tell you whether to buy, adapt or build.' },
  { slug: 'choosing-hotel-management-system', cat: 'Hospitality', title: 'Choosing a hotel management system: what to look for', excerpt: 'Bookings, billing and the features that matter for Ghanaian hotels and guest houses.' },
];

export const cases = [
  { result: '[e.g. Check-in time cut from 10 minutes to 2]', client: '[Client name]', sector: 'Hospitality', solution: 'Software · GEMS ERP', thread: 'tech' },
  { result: '[e.g. IT downtime reduced by X%]', client: '[Client name]', sector: '[Industry]', solution: 'Managed IT', thread: 'brand' },
  { result: '[e.g. One brand across X locations in X weeks]', client: '[Client name]', sector: '[Industry]', solution: 'Brand and Print', thread: 'print' },
];

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
