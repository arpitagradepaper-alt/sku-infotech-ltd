import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Code, Smartphone, Palette, Cloud, Megaphone, ShieldCheck, Database, Headphones,
  ShoppingCart, ArrowRight, Check, Plus, ChevronRight, Zap, Wallet, Lock, Layers,
} from 'lucide-react'
import useReveal from '../hooks/useReveal'
import Process from '../components/Process'
import './ServicesPage.css'

const cats = [
  { id: 'all', t: 'All Services' },
  { id: 'dev', t: 'Development' },
  { id: 'design', t: 'Design' },
  { id: 'cloud', t: 'Cloud & Security' },
  { id: 'mkt', t: 'Marketing' },
]

const services = [
  { cat: 'dev', icon: <Code size={26} />, title: 'Web Development', desc: 'Fast, secure and scalable websites and web apps built with modern technologies.',
    features: ['Business and corporate websites', 'Custom web applications', 'Admin panels and dashboards'], tags: ['React', 'Node.js', 'Next.js'] },
  { cat: 'dev', icon: <Smartphone size={26} />, title: 'Mobile App Development', desc: 'Smooth Android and iOS apps that your customers will love to use every day.',
    features: ['Android and iOS apps', 'Cross-platform development', 'App store publishing help'], tags: ['Flutter', 'React Native', 'Firebase'] },
  { cat: 'dev', icon: <ShoppingCart size={26} />, title: 'E-Commerce Solutions', desc: 'Complete online stores with secure payments, inventory and order management.',
    features: ['Custom online stores', 'Payment gateway setup', 'Product and order management'], tags: ['Shopify', 'WooCommerce', 'Stripe'] },
  { cat: 'design', icon: <Palette size={26} />, title: 'UI/UX Design', desc: 'Clean, user-friendly designs that turn visitors into loyal customers.',
    features: ['Wireframes and prototypes', 'Modern responsive screens', 'Design system and style guide'], tags: ['Figma', 'Prototyping', 'Research'] },
  { cat: 'design', icon: <Layers size={26} />, title: 'Branding & Graphics', desc: 'Logo, brand identity and social media graphics that make your business memorable.',
    features: ['Logo and brand identity', 'Social media creatives', 'Brochures and presentations'], tags: ['Logo', 'Identity', 'Print'] },
  { cat: 'cloud', icon: <Cloud size={26} />, title: 'Cloud Solutions', desc: 'Reliable cloud setup, migration and hosting that grows with your business.',
    features: ['Cloud setup and migration', 'Hosting and deployment', 'Backup and recovery'], tags: ['AWS', 'Docker', 'Kubernetes'] },
  { cat: 'cloud', icon: <ShieldCheck size={26} />, title: 'Cyber Security', desc: 'Protect your data and systems with strong security practices and monitoring.',
    features: ['Security audit and testing', 'Data protection setup', 'Continuous monitoring'], tags: ['Audit', 'SSL', 'Firewall'] },
  { cat: 'cloud', icon: <Headphones size={26} />, title: 'IT Support & Maintenance', desc: 'Technical support and regular maintenance so your systems keep running smoothly.',
    features: ['Bug fixes and updates', 'Performance monitoring', 'Priority support channel'], tags: ['Support', 'Updates', 'Uptime'] },
  { cat: 'mkt', icon: <Megaphone size={26} />, title: 'Digital Marketing', desc: 'SEO, social media and ad campaigns that bring real traffic and real results.',
    features: ['SEO and content strategy', 'Social media management', 'Google and Meta ad campaigns'], tags: ['SEO', 'Ads', 'Social'] },
]

const promises = [
  { icon: <Zap size={24} />, t: 'Scalable by Design', d: 'Built to grow as your business grows.' },
  { icon: <Wallet size={24} />, t: 'Transparent Pricing', d: 'Clear estimate before we start. No hidden costs.' },
  { icon: <Lock size={24} />, t: 'Secure by Default', d: 'Security is part of every project, not an add-on.' },
  { icon: <Headphones size={24} />, t: 'Ongoing Support', d: 'We stay with you even after the launch.' },
]

const faqs = [
  { q: 'How long does a project take?', a: 'It depends on the size. A simple website can take a few weeks, while a custom app takes longer. After the free consultation we give you a clear timeline.' },
  { q: 'How much will it cost?', a: 'Every project is different, so we share a transparent estimate after understanding your requirements. There is no obligation to proceed.' },
  { q: 'Will I get support after launch?', a: 'Yes. We offer post-launch support and maintenance plans so your product stays secure and up to date.' },
  { q: 'Can you improve my existing website or app?', a: 'Yes. We can redesign, fix issues, add features and improve the speed of an existing product.' },
  { q: 'Do I own the source code?', a: 'Yes. Once the project is completed and paid for, the code and design files belong to you.' },
]


const codeLines = [
  [['const ', 'k'], ['services ', 'p'], ['= [', 'p']],
  [["  'Web Development'", 's'], [',', 'p']],
  [["  'Mobile Apps'", 's'], [',', 'p']],
  [["  'Cloud Solutions'", 's'], [',', 'p']],
  [['];', 'p']],
  [],
  [['async function ', 'k'], ['build', 'f'], ['(idea) {', 'p']],
  [['  const ', 'k'], ['design = ', 'p'], ['await ', 'k'], ['team.design(idea);', 'p']],
  [['  const ', 'k'], ['product = ', 'p'], ['await ', 'k'], ['team.develop(design);', 'p']],
  [['  return ', 'k'], ['team.launch(product);', 'p']],
  [['}', 'p']],
  [],
  [["build('your idea'); ", 'p'], ['// live', 'c']],
]

const TOTAL_CHARS = codeLines.reduce(
  (sum, line) => sum + line.reduce((n, [t]) => n + t.length, 0) + 1,
  0
)
const PAUSE_TICKS = 70 

function CodeEditor() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setCount(TOTAL_CHARS)
      return
    }
    const id = setInterval(() => {
      setCount((c) => (c >= TOTAL_CHARS + PAUSE_TICKS ? 0 : c + 1))
    }, 38)
    return () => clearInterval(id)
  }, [])

  let left = count
  let cursorLine = 0
  const visible = []

  for (let li = 0; li < codeLines.length; li++) {
    if (left < 0) break
    const parts = []
    for (let si = 0; si < codeLines[li].length; si++) {
      if (left <= 0) break
      const [text, type] = codeLines[li][si]
      parts.push(<span key={si} className={`spc-${type}`}>{text.slice(0, left)}</span>)
      left -= text.length
    }
    visible.push({ li, parts })
    cursorLine = li
    left -= 1 // the line break
  }

  const done = count >= TOTAL_CHARS

  return (
    <div className="spc" aria-hidden="true">
      <div className="spc-bar">
        <i></i><i></i><i></i>
        <span className="spc-tab">services.js</span>
      </div>
      <div className="spc-body">
        {visible.map(({ li, parts }) => (
          <div className="spc-line" key={li}>
            <span className="spc-n">{li + 1}</span>
            <span>
              {parts}
              {li === cursorLine && <span className="spc-cursor"></span>}
            </span>
          </div>
        ))}
      </div>
      <div className={`spc-status ${done ? 'done' : ''}`}>
        <i></i>
        <span>{done ? 'Build successful. Live on production.' : 'Compiling...'}</span>
        <b>JavaScript</b>
      </div>
    </div>
  )
}

function ServiceCard({ s, i, n }) {
  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px')
    e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px')
  }
  return (
    <div className="sp-card" style={{ '--d': `${i * 0.08}s` }} onMouseMove={spot}>
      <span className="sp-num">{String(n).padStart(2, '0')}</span>
      <div className="sp-icon">{s.icon}</div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
      <ul>
        {s.features.map((f) => (
          <li key={f}><Check size={15} /> {f}</li>
        ))}
      </ul>
      <div className="sp-tags">
        {s.tags.map((t) => <span key={t}>{t}</span>)}
      </div>
      <Link to="/contact" className="sp-quote">Get a Quote <ArrowRight size={16} /></Link>
    </div>
  )
}

export default function ServicesPage() {
  useReveal()
  const [cat, setCat] = useState('all')
  const [open, setOpen] = useState(0)

  const list = services.filter((s) => cat === 'all' || s.cat === cat)
  const count = (id) => (id === 'all' ? services.length : services.filter((s) => s.cat === id).length)

  return (
    <main className="sp">
  
      <section className="sp-hero">
        <div className="sp-hero-left">
          <div className="sp-crumb">
            <Link to="/">Home</Link> <ChevronRight size={14} /> <b>Services</b>
          </div>
          <div className="sv-label">
            <span className="line l-left"></span>
            What We Do
          </div>
          <h1>Services That Turn Ideas Into <span>Digital Reality</span></h1>
          <p>
            From websites and mobile apps to cloud and security, we provide everything
            your business needs to build, launch and grow online.
          </p>
          <div className="sp-hero-btns">
            <Link to="/contact" className="btn-gold">Get Free Quote <ArrowRight size={16} /></Link>
            <a href="#sv-list" className="sp-ghost">Explore Services</a>
          </div>
        </div>

        <div className="sp-visual">
          <div className="sp-glow"></div>
          <CodeEditor />
        </div>
      </section>

    
      <section className="sp-list" id="sv-list">
        <div className="sp-filter">
          {cats.map((c) => (
            <button key={c.id} className={cat === c.id ? 'on' : ''} onClick={() => setCat(c.id)}>
              {c.t} <em>{count(c.id)}</em>
            </button>
          ))}
        </div>

        <div className="sp-grid">
          {list.map((s, i) => (
            <ServiceCard key={cat + s.title} s={s} i={i} n={services.indexOf(s) + 1} />
          ))}
        </div>
      </section>

      <section className="sp-band reveal">
        <span className="band-blob bb1"></span>
        <span className="band-blob bb2"></span>
        <div className="band-head">
          <small>Our Promise</small>
          <h2>Built On <span>Trust</span>, Delivered With Care</h2>
        </div>
        <div className="band-grid">
          {promises.map((p, i) => (
            <div className="band-item" key={p.t} style={{ '--i': i }}>
              <div className="band-ic">{p.icon}</div>
              <h4>{p.t}</h4>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="sp-faq">
        <div className="sv-head reveal">
          <div className="sv-label">
            <span className="line l-left"></span>
            FAQ
            <span className="line l-right"></span>
          </div>
          <h2>Common <span>Questions</span></h2>
          <p>Quick answers about how we work with our clients.</p>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => (
            <div className={`faq ${open === i ? 'open' : ''}`} key={f.q}>
              <button onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <i><Plus size={18} /></i>
              </button>
              <div className="faq-a"><div><p>{f.a}</p></div></div>
            </div>
          ))}
        </div>
      </section>

   
      <Process />
    </main>
  )
}