import { Code, Smartphone, Palette, Cloud, Megaphone, ShieldCheck, Database, Headphones, ArrowRight } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import './Services.css'

const row1 = [
  { icon: <Code size={26} />, title: 'Web Development', desc: 'Fast, secure and scalable websites and web apps built with modern technologies.' },
  { icon: <Smartphone size={26} />, title: 'Mobile App Development', desc: 'Smooth Android and iOS apps that your customers will love to use every day.' },
  { icon: <Palette size={26} />, title: 'UI/UX Design', desc: 'Clean, user-friendly designs that turn visitors into loyal customers.' },
  { icon: <Cloud size={26} />, title: 'Cloud Solutions', desc: 'Reliable cloud setup, migration and hosting that grows with your business.' },
]

const row2 = [
  { icon: <Megaphone size={26} />, title: 'Digital Marketing', desc: 'SEO, social media and ad campaigns that bring real traffic and real results.' },
  { icon: <ShieldCheck size={26} />, title: 'Cyber Security', desc: 'Protect your data and systems with advanced security and 24/7 monitoring.' },
  { icon: <Database size={26} />, title: 'Data & Analytics', desc: 'Turn raw data into clear dashboards and smart business decisions.' },
  { icon: <Headphones size={26} />, title: 'IT Support', desc: 'Round the clock technical support so your business never slows down.' },
]

function Card({ s, n }) {
  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px')
    e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px')
  }
  return (
    <div className="service-card" onMouseMove={spotlight}>
      <span className="sv-num">{n}</span>
      <div className="sv-icon">{s.icon}</div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
      <a href="#" className="sv-link">Learn More <ArrowRight size={16} /></a>
    </div>
  )
}

function Marquee({ items, reverse, start }) {
  // list 2 baar render hoti hai taaki loop seamless rahe
  const loop = [...items, ...items]
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        {loop.map((s, i) => (
          <Card key={i} s={s} n={String(start + (i % items.length)).padStart(2, '0')} />
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  useReveal()

  return (
    <section className="services" id="services">
      <div className="sv-deco sv-ring"></div>
      <div className="sv-deco sv-dots"></div>

      <div className="sv-head reveal">
        <div className="sv-label">
          <span className="line l-left"></span>
          Our Services
          <span className="line l-right"></span>
        </div>
        <h2>Where Innovation Meets <span>Excellence.</span></h2>
        <p>We deliver complete digital solutions that help your business stand out and grow faster.</p>
      </div>

      <Marquee items={row1} start={1} />
      <Marquee items={row2} start={5} reverse />

      <div className="sv-cta reveal" style={{ '--d': '.2s' }}>
        <button className="btn-gold">View All Services <ArrowRight size={16} /></button>
      </div>
    </section>
  )
}
