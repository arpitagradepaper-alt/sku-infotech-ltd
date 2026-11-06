import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin, ArrowRight, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

const quick = [
  { t: 'Home', h: '/' },
  { t: 'Services', h: '/services' },
  { t: 'About Us', h: '/about' },
  { t: 'How We Work', h: '/#process' },
  { t: 'Contact', h: '/contact' },
]

const services = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Cloud Solutions',
  'Digital Marketing',
  'Cyber Security',
]

const strip = ['Innovate', 'Develop', 'Grow', 'Smarter Tomorrow', 'SKU Infotech LTD']

const socials = [
  {
    name: 'Facebook',
    path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z',
  },
  {
    name: 'Instagram',
    path: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2.2c-3.1 0-3.5 0-4.7.1-3.2.1-4.9 1.8-5 5C2.2 8.5 2.2 8.9 2.2 12s0 3.5.1 4.7c.1 3.2 1.8 4.9 5 5 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c3.2-.1 4.9-1.8 5-5 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-3.2-1.8-4.9-5-5-1.2-.1-1.6-.1-4.7-.1zm0 1.8c3.1 0 3.4 0 4.6.1 2.2.1 3.2 1.1 3.3 3.3.1 1.2.1 1.5.1 4.6s0 3.4-.1 4.6c-.1 2.2-1.1 3.2-3.3 3.3-1.2.1-1.5.1-4.6.1s-3.4 0-4.6-.1c-2.2-.1-3.2-1.1-3.3-3.3C4 15.4 4 15.1 4 12s0-3.4.1-4.6C4.2 5.2 5.2 4.2 7.4 4.1 8.6 4 8.9 4 12 4z',
  },
  {
    name: 'LinkedIn',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3V9.75zm6.5 0h3.8v1.6h.06c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.64 4.74 6.06v5.89h-4v-5.22c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76v5.31h-4V9.75z',
  },
  {
    name: 'X',
    path: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3zm-1.08 16.16h1.7L7.4 4.74H5.58l11.09 14.42z',
  },
]

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const loop = [...strip, ...strip, ...strip, ...strip]

  return (
    <footer className="footer">
      <div className="ft-line"></div>
      <span className="ft-blob fb1"></span>
      <span className="ft-blob fb2"></span>
      <span className="ft-ring"></span>

      <div className="ft-main">
       
        <div className="ft-col ft-brand">
          <div className="ft-logo">
            <div className="ft-logo-icon">S</div>
            <div>
              <h3><span>SKU</span> INFOTECH LTD</h3>
              <small>Innovate â€¢ Develop â€¢ Grow</small>
            </div>
          </div>
          <p>
            We turn ideas into powerful digital solutions, helping businesses
            innovate, grow and lead with modern technology.
          </p>
          <div className="ft-social">
            {socials.map((s, i) => (
              <a href="#" key={s.name} aria-label={s.name} style={{ '--i': i }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

   
        <div className="ft-col">
          <h4>Quick Links</h4>
          <ul>
            {quick.map((q) => (
              <li key={q.t}>
                <Link to={q.h}><ArrowRight size={14} /> {q.t}</Link>
              </li>
            ))}
          </ul>
        </div>

      
        <div className="ft-col">
          <h4>Our Services</h4>
          <ul>
            {services.map((s) => (
              <li key={s}>
                <Link to="/services"><ArrowRight size={14} /> {s}</Link>
              </li>
            ))}
          </ul>
        </div>

     
        <div className="ft-col">
          <h4>Get In Touch</h4>
          <ul className="ft-contact">
            <li><span><Mail size={16} /></span> hello@skuinfotech.com</li>
            <li><span><Phone size={16} /></span> +447776597878 </li>
            <li><span><MapPin size={16} /></span>  Address</li>
          </ul>
        </div>
      </div>

  
      <div className="ft-strip">
        <div className="ft-track">
          {loop.map((t, i) => (
            <span key={i}><i></i>{t}</span>
          ))}
        </div>
      </div>

      <div className="ft-bottom">
        <span>Â© {new Date().getFullYear()} SKU Infotech LTD. All rights reserved.</span>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

 
      <a href="#" className={`to-top ${showTop ? 'show' : ''}`} aria-label="Back to top">
        <span><ArrowUp size={20} /></span>
      </a>
    </footer>
  )
}
