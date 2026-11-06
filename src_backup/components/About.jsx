import { Award, Users, Clock, ShieldCheck } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import CodeEditor from './CodeEditor'
import './About.css'

const features = [
  { icon: <Award size={22} />, title: 'Proven Expertise', desc: '1,000+ projects delivered with top quality.' },
  { icon: <Users size={22} />, title: 'Dedicated Team', desc: 'Skilled developers and designers for you.' },
  { icon: <Clock size={22} />, title: 'On-Time Delivery', desc: '95% projects completed before deadline.' },
  { icon: <ShieldCheck size={22} />, title: 'Secure & Reliable', desc: 'Enterprise-grade security and 24/7 support.' },
]

const tech1 = ['React', 'Node.js', 'Python', 'AWS', 'Flutter', 'MongoDB', 'Docker', 'Figma']
const tech2 = ['Next.js', 'TypeScript', 'Java', 'Firebase', 'MySQL', 'Kubernetes', 'Laravel', 'Tailwind']

function TechRow({ items, reverse }) {
  const loop = [...items, ...items]
  return (
    <div className="marquee tech-marquee">
      <div className={`marquee-track tech-track ${reverse ? 'reverse' : ''}`}>
        {loop.map((t, i) => (
          <span className="tech-pill" key={i}><i></i>{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  useReveal()

  return (
    <section className="about" id="about">
      <div className="ab-deco ab-ring"></div>
      <div className="ab-deco ab-dots"></div>

      <div className="about-grid">
        <div className="orbit-wrap reveal">
          <CodeEditor />
        </div>

        <div className="about-content">
          <div className="sv-label reveal">
            <span className="line l-left"></span>
            Why Choose Us
          </div>
          <h2 className="reveal" style={{ '--d': '.1s' }}>
            We Build Technology That <span>Never Stops</span> Growing
          </h2>
          <p className="ab-text reveal" style={{ '--d': '.2s' }}>
            At SKU Infotech LTD, we combine creativity, modern technology and
            smart strategy to deliver solutions that keep your business moving forward, every single day.
          </p>

          <div className="feat-grid">
            {features.map((f, i) => (
              <div className="feat reveal" key={f.title} style={{ '--d': `${0.25 + i * 0.12}s` }}>
                <div className="feat-inner">
                  <div className="feat-icon">{f.icon}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tech-head reveal">Technologies We Work With</div>
      <TechRow items={tech1} />
      <TechRow items={tech2} reverse />
    </section>
  )
}
