import { ChevronDown, ArrowRight } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-icon">S</div>
        <div>
          <h3><span>SKU</span> INFOTECH LTD</h3>
          <small>Innovate • Develop • Grow</small>
        </div>
      </div>

      <ul className="nav-links">
        <li className="active">Home</li>
        <li>Services <ChevronDown size={14} /></li>
        <li>About</li>
        <li>Careers</li>
        <li>Contact</li>
      </ul>

      <button className="btn-gold">Get Started <ArrowRight size={18} /></button>
    </nav>
  )
}
