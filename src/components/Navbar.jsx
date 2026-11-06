import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import './Navbar.css'

const links = [
  { t: 'Home', to: '/' },
  { t: 'About', to: '/about' },
  { t: 'Services', to: '/services' },
  { t: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav className={`navbar ${open ? 'open' : ''}`}>
      <Link to="/" className="logo">
        <div className="logo-icon">S</div>
        <div>
          <h3><span>SKU</span> INFOTECH LTD</h3>
          <small>Innovate • Develop • Grow</small>
        </div>
      </Link>

      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.t} className={pathname === l.to ? 'active' : ''}>
            <Link to={l.to}>{l.t}</Link>
          </li>
        ))}
      </ul>

      <Link to="/contact" className="btn-gold nav-cta">Get Started <ArrowRight size={18} /></Link>

      <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  )
}
