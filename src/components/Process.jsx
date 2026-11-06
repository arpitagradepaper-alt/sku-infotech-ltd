import { MessageCircle, ClipboardList, Palette, Code, Rocket, ArrowRight, Sparkles } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import { Link } from 'react-router-dom'
import './Process.css'

const steps = [
  { icon: <MessageCircle size={24} />, title: 'Discuss', desc: 'We listen to your idea, goals and budget.' },
  { icon: <ClipboardList size={24} />, title: 'Plan', desc: 'Clear roadmap, timeline and cost estimate.' },
  { icon: <Palette size={24} />, title: 'Design', desc: 'Modern, user-friendly screens for your approval.' },
  { icon: <Code size={24} />, title: 'Develop', desc: 'Clean code, tested at every stage.' },
  { icon: <Rocket size={24} />, title: 'Launch', desc: 'Go live smoothly, with support after launch.' },
]

const strip = ['Free Consultation', 'Transparent Pricing', 'On-Time Delivery', 'Post-Launch Support', 'Modern Technology']

export default function Process() {
  useReveal()
  const loop = [...strip, ...strip, ...strip, ...strip]

  return (
    <section className="process" id="process">
      <div className="pr-deco pr-ring"></div>
      <div className="pr-deco pr-dots"></div>

      <div className="sv-head reveal">
        <div className="sv-label">
          <span className="line l-left"></span>
          How We Work
          <span className="line l-right"></span>
        </div>
        <h2>Simple Steps To <span>Build Your Idea</span></h2>
        <p>A clear and transparent process, so you always know what is happening with your project.</p>
      </div>

      <div className="tl reveal" style={{ '--d': '.15s' }}>
        <div className="tl-line">
          <div className="tl-fill"></div>
          <div className="tl-dot"></div>
        </div>

        {steps.map((s, i) => (
          <div className="tl-step" key={s.title} style={{ '--i': i }}>
            <div className="tl-node">
              <span className="tl-pulse"></span>
              <div className="tl-icon">{s.icon}</div>
              <em>0{i + 1}</em>
            </div>
            <div className="tl-card">
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- CTA banner ---------- */}
      <div className="cta reveal" style={{ '--d': '.1s' }}>
        <span className="cta-blob c1"></span>
        <span className="cta-blob c2"></span>
        <span className="cta-ring r1"></span>
        <span className="cta-ring r2"></span>
        <Sparkles className="cta-spark s1" size={26} />
        <Sparkles className="cta-spark s2" size={18} />
        <Sparkles className="cta-spark s3" size={22} />

        <div className="cta-inner">
          <small>Free Consultation</small>
          <h2>Have an idea? Let&apos;s build it together.</h2>
          <p>Tell us what you need and get a free consultation and a clear estimate, with no obligation.</p>
          <Link to="/contact" className="btn-white">Get Free Consultation <ArrowRight size={18} /></Link>
        </div>

        <div className="cta-strip">
          <div className="cta-track">
            {loop.map((t, i) => (
              <span key={i}><i></i>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
