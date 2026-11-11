import { Link } from 'react-router-dom'
import {
  ChevronRight, ArrowRight, Code2, Smartphone, Cloud,
  ShieldCheck, Award, Lightbulb, Target, Users, BadgeCheck, Check,
  Wallet, Zap, Headphones, Layers,
} from 'lucide-react'
import useReveal from '../hooks/useReveal'
import './AboutPage.css'



const profile = [
  { k: 'Company', v: 'SKU Infotech LTD' },
  { k: 'Focus', v: 'Web, Mobile and Cloud' },
  { k: 'Approach', v: 'Transparent and collaborative' },
  { k: 'Engagement', v: 'Project based and long term' },
  { k: 'Support', v: 'Post-launch maintenance' },
]

const highlights = [
  { t: 'Clear pricing', d: 'Fixed estimates before work begins.' },
  { t: 'One team', d: 'Designers and developers under one roof.' },
  { t: 'Modern stack', d: 'The right tools for each problem.' },
  { t: 'After launch', d: 'Monitoring, fixes and improvements.' },
]

const commitments = [
  'Honest advice, even when it changes the scope.',
  'Regular reviews so you always see progress.',
  'Support that continues after launch.',
]

const expertise = [
  {
    icon: Code2,
    t: 'Web Development',
    d: 'Business websites, web applications and portals built to be fast, secure and easy to maintain.',
    pts: ['Corporate websites', 'Custom web applications', 'E-commerce platforms'],
  },
  {
    icon: Smartphone,
    t: 'Mobile Applications',
    d: 'Android and iOS applications designed around how your customers actually use their phones.',
    pts: ['Android and iOS apps', 'Cross-platform builds', 'App store release'],
  },
  {
    icon: Cloud,
    t: 'Cloud Solutions',
    d: 'Reliable hosting, deployment and monitoring so your product stays available as you grow.',
    pts: ['Cloud setup and migration', 'Deployment pipelines', 'Monitoring and scaling'],
  },
]

const values = [
  { icon: ShieldCheck, t: 'Integrity', d: 'Honest communication, clear pricing and no hidden surprises.' },
  { icon: Award, t: 'Quality', d: 'We test and refine every detail before it reaches you.' },
  { icon: Lightbulb, t: 'Innovation', d: 'We choose the right modern technology for each problem.' },
  { icon: Target, t: 'Client First', d: 'Your goals decide our decisions, from start to finish.' },
  { icon: Users, t: 'Collaboration', d: 'Designers, developers and you, working as one team.' },
  { icon: BadgeCheck, t: 'Accountability', d: 'We own our deadlines and stand behind our work.' },
]

const reasons = [
  { icon: Wallet, t: 'Fair, clear pricing', d: 'Modern engineering at a transparent price, agreed before work begins.' },
  { icon: Zap, t: 'Steady delivery', d: 'Clear milestones and regular releases keep your project moving.' },
  { icon: Headphones, t: 'Real support', d: 'Talk to a real person before, during and after launch.' },
  { icon: Layers, t: 'Built to scale', d: 'We plan the architecture so your product can grow with your business.' },
]

const approach = [
  { t: 'Understand', d: 'We study your business, users and goals before writing any code.' },
  { t: 'Architect', d: 'A clear plan, technology choice, timeline and estimate.' },
  { t: 'Build', d: 'Iterative development with regular reviews and testing.' },
  { t: 'Support', d: 'Smooth launch, monitoring and ongoing improvements.' },
]



export default function AboutPage() {
  useReveal()

  return (
    <main className="ap">
      {/* Hero */}
      <section className="ap-hero">
        <div className="ap-hero-box">
          <div className="ap-hero-text">
            <nav className="ap-crumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <ChevronRight size={13} /> <b>About us</b>
            </nav>
            <span className="ap-hero-tag">ABOUT US</span>
            <h1>
              Technology built with <span>clarity and care.</span>
            </h1>
            <p>
              At SKU Infotech LTD, we turn ideas into powerful digital solutions ? helping
              businesses innovate, grow and lead.
            </p>
            <div className="ap-btns">
              <Link to="/contact" className="btn-gold">Talk to us <ArrowRight size={16} /></Link>
              <Link to="/services" className="ap-link">Our services</Link>
            </div>
          </div>

          <div className="ap-hero-visual">
            <div className="ap-hero-imgwrap">
              <img src="/images/about-hero.svg" alt="About SKU Infotech" />
            </div>
            {[profile[1], profile[2], profile[4]].map((p, i) => (
              <div className={`ap-float f${i + 1}`} key={p.k}>
                <span>{p.k}</span>
                <b>{p.v}</b>
              </div>
            ))}
          </div>
        </div>

        <ul className="ap-strip">
          {highlights.map((h) => (
            <li key={h.t}>
              <b>{h.t}</b>
              <span>{h.d}</span>
            </li>
          ))}
        </ul>
      </section>

     
      <section className="ap-sec ap-overview">
        <div className="ap-head reveal">
          <div className="ap-label">Who we are</div>
          <h2>A fresh start, with high standards.</h2>
        </div>
        <div className="ap-overview-body reveal" style={{ '--d': '.1s' }}>
          <p>
            We started SKU Infotech LTD with one belief: good technology should be simple,
            reliable and accessible to every business, small or large.
          </p>
          <p>
            As a young company, we work closely with each client, listen carefully and give
            every project our full attention. Our commitment to quality and honesty is
            already part of everything we build.
          </p>
          <ul className="ap-checks">
            {commitments.map((c) => (
              <li key={c}><Check size={18} /> {c}</li>
            ))}
          </ul>
          <blockquote>Innovate. Develop. Grow. Three words that guide every project we take on.</blockquote>
        </div>
      </section>

 
      <section className="ap-sec ap-mv">
        <article className="ap-mv-card dark reveal">
          <div className="ap-label light">Our mission</div>
          <h3>Make modern technology work for every business.</h3>
          <p>
            To deliver reliable, modern and affordable digital solutions that help
            businesses work smarter, reach more customers and grow with confidence.
          </p>
        </article>
        <article className="ap-mv-card light reveal" style={{ '--d': '.1s' }}>
          <div className="ap-label">Our vision</div>
          <h3>Be a technology partner people trust.</h3>
          <p>
            To become a partner known for quality, honesty and innovation, building a
            smarter tomorrow together with our clients.
          </p>
        </article>
      </section>

      
      <section className="ap-sec">
        <div className="ap-head ap-head-split reveal">
          <div>
            <div className="ap-label">What we do</div>
            <h2>Our areas of expertise</h2>
          </div>
          <p>Three focus areas, delivered by one team that stays with you from first idea to live product.</p>
        </div>
        <div className="ap-exp-grid">
          {expertise.map((e, i) => (
            <article className="ap-exp reveal" key={e.t} style={{ '--d': `${i * 0.08}s` }}>
              <span className="ap-icon"><e.icon size={24} /></span>
              <h4>{e.t}</h4>
              <p>{e.d}</p>
              <ul>
                {e.pts.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

 
      <section className="ap-sec">
        <div className="ap-head ap-head-split reveal">
          <div>
            <div className="ap-label">Our values</div>
            <h2>What we stand for</h2>
          </div>
          <p>The principles behind how we communicate, build and support every client.</p>
        </div>
        <div className="ap-val-grid reveal">
          {values.map((v) => (
            <div className="ap-val" key={v.t}>
              <span className="ap-icon sm"><v.icon size={20} /></span>
              <h4>{v.t}</h4>
              <p>{v.d}</p>
            </div>
          ))}
        </div>
      </section>

    
      <section className="ap-sec">
        <div className="ap-head ap-head-split reveal">
          <div>
            <div className="ap-label">Our approach</div>
            <h2>How we work with you</h2>
          </div>
          <p>A simple four-stage process, so you always know what is happening and what comes next.</p>
        </div>
        <ol className="ap-steps">
          {approach.map((a, i) => (
            <li className="ap-step reveal" key={a.t} style={{ '--d': `${i * 0.08}s` }}>
              <span className="ap-step-n">{i + 1}</span>
              <h4>{a.t}</h4>
              <p>{a.d}</p>
            </li>
          ))}
        </ol>
      </section>

   
      <section className="ap-sec">
        <div className="ap-why">
          <div className="ap-why-text reveal">
            <div className="ap-label light">Why choose us</div>
            <h2>A technology partner that stays with you.</h2>
            <p>
              From the first conversation to long after launch, we keep things simple:
              clear plans, honest updates and software that works.
            </p>
            <Link to="/contact" className="btn-gold">Start a project <ArrowRight size={16} /></Link>
          </div>
          <div className="ap-why-grid">
            {reasons.map((r, i) => (
              <div className="ap-why-item reveal" key={r.t} style={{ '--d': `${i * 0.08}s` }}>
                <span className="ap-why-icon"><r.icon size={20} /></span>
                <h4>{r.t}</h4>
                <p>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="ap-cta reveal">
        <div>
          <h2>Have a project in mind? Let&apos;s talk.</h2>
          <p>Get a free consultation and a clear estimate. No obligation.</p>
        </div>
        <Link to="/contact" className="btn-gold">Get free consultation <ArrowRight size={16} /></Link>
      </section>
    </main>
  )
}