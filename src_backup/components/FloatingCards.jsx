import { TrendingUp, CheckCircle, Code } from 'lucide-react'
import './FloatingCards.css'

export default function FloatingCards() {
  return (
    <>
      <div className="fcard growth">
        <small>Business Growth</small>
        <h3>+40% <TrendingUp size={18} color="#059669" /></h3>
      </div>

      <div className="fcard projects">
        <CheckCircle color="#22a559" />
        <div>
          <small>Projects Delivered</small>
          <h3>1,000+</h3>
        </div>
      </div>

      <div className="fcard code"><Code size={36} color="#fff" /></div>
    </>
  )
}
