export const COMPANY = {
  name: 'SKU Infotech LTD',
  email: 'hello@skuinfotech.com',
  phone: '+447776597878',
  hours: 'Mon - Sat, 10 AM to 7 PM (closed on Sunday)',
}

const R = (text, extra = {}) => ({ text: Array.isArray(text) ? text : [text], ...extra })
const chip = (l, q) => ({ l, q })

export const SERVICES = [
  { id: 'web', title: 'Web Development', desc: 'Fast, secure and scalable websites and web apps built with modern technologies.',
    points: ['Business and corporate websites', 'Custom web applications', 'Admin panels and dashboards'], tags: ['React', 'Node.js', 'Next.js'],
    match: /\bweb ?(sites?|apps?|applications?|development|dev|design)?\b/, weight: 4 },
  { id: 'mobile', title: 'Mobile App Development', desc: 'Smooth Android and iOS apps that your customers will love to use every day.',
    points: ['Android and iOS apps', 'Cross-platform development', 'App store publishing help'], tags: ['Flutter', 'React Native', 'Firebase'],
    match: /\b(mobile|android|ios|iphone|flutter|react native|play store|app store)\b/, weight: 3, extra: [[/\bapps?\b/, 1]] },
  { id: 'ecommerce', title: 'E-Commerce Solutions', desc: 'Complete online stores with secure payments, inventory and order management.',
    points: ['Custom online stores', 'Payment gateway setup', 'Product and order management'], tags: ['Shopify', 'WooCommerce', 'Stripe'],
    match: /\b(e-?commerce|online store|online shop|shopify|woocommerce|stripe|payment gateway|sell online)\b/, weight: 4 },
  { id: 'design', title: 'UI/UX Design', desc: 'Clean, user-friendly designs that turn visitors into loyal customers.',
    points: ['Wireframes and prototypes', 'Modern responsive screens', 'Design system and style guide'], tags: ['Figma', 'Prototyping', 'Research'],
    match: /\b(ui|ux|ui\/ux|design|designer|figma|wireframes?|prototypes?|mockups?)\b/, weight: 3 },
  { id: 'branding', title: 'Branding & Graphics', desc: 'Logo, brand identity and social media graphics that make your business memorable.',
    points: ['Logo and brand identity', 'Social media creatives', 'Brochures and presentations'], tags: ['Logo', 'Identity', 'Print'],
    match: /\b(brand|branding|logo|logos|graphics?|identity|brochures?|creatives?)\b/, weight: 3 },
  { id: 'cloud', title: 'Cloud Solutions', desc: 'Reliable cloud setup, migration and hosting that grows with your business.',
    points: ['Cloud setup and migration', 'Hosting and deployment', 'Backup and recovery'], tags: ['AWS', 'Docker', 'Kubernetes'],
    match: /\b(cloud|aws|azure|hosting|host|deploy\w*|docker|kubernetes|devops|servers?)\b/, weight: 3 },
  { id: 'security', title: 'Cyber Security', desc: 'Protect your data and systems with strong security practices and monitoring.',
    points: ['Security audit and testing', 'Data protection setup', 'Continuous monitoring'], tags: ['Audit', 'SSL', 'Firewall'],
    match: /\b(cyber|security|secure|hack\w*|audit|ssl|firewall|penetration|data protection|vulnerab\w*)\b/, weight: 3 },
  { id: 'support', title: 'IT Support & Maintenance', desc: 'Technical support and regular maintenance so your systems keep running smoothly.',
    points: ['Bug fixes and updates', 'Performance monitoring', 'Priority support channel'], tags: ['Support', 'Updates', 'Uptime'],
    match: /\b(it support|maintenance|technical support|helpdesk)\b/, weight: 4, extra: [[/\bsupport\b/, 1]] },
  { id: 'marketing', title: 'Digital Marketing', desc: 'SEO, social media and ad campaigns that bring real traffic and real results.',
    points: ['SEO and content strategy', 'Social media management', 'Google and Meta ad campaigns'], tags: ['SEO', 'Ads', 'Social'],
    match: /\b(marketing|seo|social media|ads|advertis\w*|campaigns?|google ads|meta ads)\b/, weight: 3 },
]

const ORDER = ['ecommerce', 'mobile', 'branding', 'design', 'cloud', 'security', 'support', 'marketing', 'web']
const SERVICES_BY_PRIORITY = ORDER.map((id) => SERVICES.find((s) => s.id === id))

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9#./&\s-]/g, ' ').replace(/\s+/g, ' ').trim()

export function findService(text) {
  const t = norm(text)
  return SERVICES.find((s) => norm(s.title) === t) || SERVICES_BY_PRIORITY.find((s) => s.match.test(t)) || null
}

export const MAIN_CHIPS = [
  chip('Our services', 'services'),
  chip('How we work', 'process'),
  chip('Pricing', 'pricing'),
  chip('Contact details', 'contact'),
  chip('Talk to the team', 'talk to the team'),
]

export const WELCOME = R(
  ['Hi! I am the SKU Infotech assistant.', 'I can answer questions about our services, process and pricing, or connect you with our team. What would you like to know?'],
  { chips: MAIN_CHIPS }
)

const FALLBACK = R(
  ['I am not sure I understood that. I can help with our services, pricing, timelines, process and contact details.', 'Or I can pass your question to our team.'],
  { chips: MAIN_CHIPS }
)

const contactActions = [
  { l: 'Email us', href: 'mailto:' + COMPANY.email, icon: 'mail' },
  { l: 'Call us', href: 'tel:' + COMPANY.phone, icon: 'phone' },
]

const serviceReply = (s) => R(
  ['**' + s.title + '**', s.desc, ...s.points.map((p) => '- ' + p), 'Technologies: ' + s.tags.join(', ') + '.'],
  { chips: [chip('Get a free quote', 'get a quote'), chip('All services', 'services'), chip('Pricing', 'pricing')], links: [{ l: 'View Services page', to: '/services' }] }
)

const INTENTS = [
  { id: 'lead', w: [
    [/\b(talk|speak|chat|connect|get in touch) (to|with) (a |an |the |your |our )?(human|person|team|someone|agent|expert|representative|sales|staff)\b/, 6],
    [/\b(human|agent|representative|callback|call back|call me)\b/, 4],
    [/\b(get|want|need|request|give me|send me) (a |an |your )?(free )?(quote|quotation|estimate|consultation|proposal)\b/, 6],
    [/\b(book|schedule|arrange|set up) (a |an )?(free )?(call|meeting|consultation|demo)\b/, 6],
    [/\b(leave|send|drop) (a |my |you a )?(message|details|enquiry|inquiry|note)\b/, 6],
    [/\bfree consultation\b/, 4],
    [/\b(hire|start a project|start my project|work with you|work together)\b/, 4],
  ], reply: { action: 'lead' } },

  { id: 'pricing', w: [[/\b(price|prices|pricing|cost|costs|charge|charges|fee|fees|budget|cheap|affordable|how much|rates?|packages?|kitna|kimat|daam|paisa)\b/, 4]],
    reply: R(['Every project is different, so we share a transparent estimate after understanding your requirements.', 'There are no hidden costs and no obligation to proceed. The first consultation is free.'],
      { chips: [chip('Get a free quote', 'get a quote'), chip('How long does it take?', 'timeline'), chip('Our services', 'services')] }) },

  { id: 'timeline', w: [[/\b(how long|timeline|time ?frame|duration|deadline|turnaround|how (fast|soon|quickly)|delivery time|how many (days|weeks|months))\b/, 4]],
    reply: R(['It depends on the size of the project. A simple website can take a few weeks, while a custom app takes longer.', 'After the free consultation we give you a clear timeline.'],
      { chips: [chip('Get a free quote', 'get a quote'), chip('How we work', 'process')] }) },

  { id: 'process', w: [[/\b(process|workflow|methodology|how (do )?(you|we) work|how does it work|steps|approach)\b/, 4]],
    reply: R(['Our process is simple and transparent:', '- **Discuss:** we listen to your idea, goals and budget', '- **Plan:** clear roadmap, timeline and cost estimate', '- **Design:** modern, user-friendly screens for your approval', '- **Develop:** clean code, tested at every stage', '- **Launch:** go live smoothly, with support after launch'],
      { chips: [chip('Get a free quote', 'get a quote'), chip('Pricing', 'pricing')], links: [{ l: 'See How We Work', to: '/#process' }] }) },

  { id: 'after', w: [[/\bafter (the )?(launch|delivery|go[- ]?live|project)\b/, 5], [/\bpost[- ]?launch\b/, 5]],
    reply: R(['Yes. We offer post-launch support and maintenance plans so your product stays secure and up to date.'],
      { chips: [chip('Get a free quote', 'get a quote'), chip('Our services', 'services')] }) },

  { id: 'source', w: [[/\b(source code|code ownership|own the code|who owns|ownership|intellectual property)\b/, 5]],
    reply: R(['Yes. Once the project is completed and paid for, the code and design files belong to you.'], { chips: [chip('Pricing', 'pricing'), chip('Talk to the team', 'talk to the team')] }) },

  { id: 'existing', w: [[/\b(existing|current|old) (website|site|app|product|software|application)\b/, 4], [/\b(redesign|revamp|upgrade|migrate|improve)\b/, 3]],
    reply: R(['Yes. We can redesign, fix issues, add features and improve the speed of an existing website or app.'], { chips: [chip('Get a free quote', 'get a quote'), chip('Our services', 'services')] }) },

  { id: 'tech', w: [[/\b(technolog(y|ies)|tech stack|stack|frameworks?|languages?|tools)\b/, 4]],
    reply: R(['We work with modern tools, including:', '- **Frontend:** React, Next.js, TypeScript, Tailwind', '- **Backend:** Node.js, Python, Java, Laravel', '- **Mobile:** Flutter, React Native, Firebase', '- **Data and cloud:** MongoDB, MySQL, AWS, Docker, Kubernetes', '- **Design:** Figma'],
      { chips: [chip('Our services', 'services'), chip('Talk to the team', 'talk to the team')] }) },

  { id: 'why', w: [[/\b(why (choose|should|pick)|what makes|different|trust|reliable|guarantee)\b/, 4]],
    reply: R(['Here is what you can expect from us:', '- **Fair, clear pricing** agreed before work begins', '- **Steady delivery** with clear milestones and regular releases', '- **Real support** before, during and after launch', '- **Built to scale** so your product grows with your business'],
      { chips: [chip('Get a free quote', 'get a quote'), chip('How we work', 'process')], links: [{ l: 'About us', to: '/about' }] }) },

  ...SERVICES_BY_PRIORITY.map((s) => ({ id: 's-' + s.id, w: [[s.match, s.weight], ...(s.extra || [])], reply: serviceReply(s) })),

  { id: 'overview', w: [[/\b(services?|offer|offerings|what do you (do|provide|sell)|solutions|capabilit\w+|expertise|specialis\w+|products?)\b/, 3]],
    reply: R(['Here is what we offer:', ...SERVICES.map((s) => '- ' + s.title), 'Tap a service to learn more.'],
      { chips: SERVICES.map((s) => chip(s.title, s.title)), links: [{ l: 'View Services page', to: '/services' }] }) },

  { id: 'contact', w: [[/\b(contact|e-?mail|phone|call|number|whatsapp|reach|touch)\b/, 3]],
    reply: R(['You can reach us here:', '- **Email:** ' + COMPANY.email, '- **Phone:** ' + COMPANY.phone, '- **Hours:** ' + COMPANY.hours, 'We usually reply within 24 hours.'],
      { actions: contactActions, chips: [chip('Leave a message', 'leave a message')], links: [{ l: 'Open Contact page', to: '/contact' }] }) },

  { id: 'hours', w: [[/\b(working hours|business hours|opening hours|office hours|timings?|hours|sunday|saturday|closed|open)\b/, 3]],
    reply: R(['We are available ' + COMPANY.hours + '.', 'Leave a message any time and we will get back to you.'], { chips: [chip('Leave a message', 'leave a message'), chip('Contact details', 'contact')] }) },

  { id: 'location', w: [[/\b(where|location|address|office|visit|located|map|city|country)\b/, 3]],
    reply: R(['You can find our location map on the Contact page.', 'For a free consultation, call or email us first and we will arrange a time.'],
      { actions: contactActions, links: [{ l: 'Open Contact page', to: '/contact' }] }) },

  { id: 'bot', w: [[/\bare you (a )?(bot|human|robot|ai|real)\b/, 4]],
    reply: R(['I am a virtual assistant for SKU Infotech. For anything detailed, our team is happy to talk to you directly.'], { chips: [chip('Talk to the team', 'talk to the team'), chip('Our services', 'services')] }) },

  { id: 'about', w: [[/\b(about (you|us|sku|the company)|who are you|your company|company|background|story|mission|values|founded)\b/, 3], [/\b(sku|infotech)\b/, 1]],
    reply: R(['SKU Infotech LTD turns ideas into powerful digital solutions, helping businesses innovate, grow and lead.', 'We focus on web, mobile and cloud, work in a transparent and collaborative way, and support you after launch.'],
      { chips: [chip('Why choose us', 'why choose you'), chip('Our services', 'services')], links: [{ l: 'About us', to: '/about' }] }) },

  { id: 'thanks', w: [[/\b(thanks|thank you|thx|dhanyavaad|shukriya)\b/, 3], [/\b(great|awesome|perfect|nice|cool)\b/, 2]],
    reply: R(['You are welcome! Is there anything else I can help you with?'], { chips: MAIN_CHIPS }) },

  { id: 'bye', w: [[/\b(bye|goodbye|see you|cya)\b/, 3]], reply: R(['Goodbye! Feel free to message us any time.']) },

  { id: 'menu', w: [[/\b(help|menu|options|what can you do|start over)\b/, 3]], reply: R(['Sure! Here is what I can help with:'], { chips: MAIN_CHIPS }) },

  { id: 'greeting', w: [[/\b(hi+|hello|hey|heya|namaste|namaskar|good (morning|afternoon|evening))\b/, 2]],
    reply: R(['Hello! How can I help you today?'], { chips: MAIN_CHIPS }) },
]

export function getReply(raw) {
  const t = norm(raw)
  if (!t) return FALLBACK
  let best = null
  let bestScore = 0
  for (const it of INTENTS) {
    let score = 0
    for (const [re, w] of it.w) if (re.test(t)) score += w
    if (score > bestScore) { best = it; bestScore = score }
  }
  return best && bestScore >= 2 ? best.reply : FALLBACK
}
