import { ArrowRight, Play } from 'lucide-react'
import FloatingCards from './FloatingCards'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="badge"><i></i> Your Trusted IT Partner</span>
        <h1>
          Technology <br /> That Builds a <br />
          <span>Smarter Tomorrow</span>
        </h1>
        <p>
          At SKU Infotech LTD, we turn ideas into powerful digital
          solutions — helping businesses innovate, grow and lead.
        </p>
        <div className="hero-btns">
          <button className="btn-gold">Explore Our Services <ArrowRight size={18} /></button>
          <button className="story-btn">
            <span className="play"><Play size={18} fill="#111" /></span> Watch Our Story
          </button>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900"
          alt="team"
        />
        <FloatingCards />
      </div>
    </section>
  )
}
