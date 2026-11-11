import { ArrowRight, ArrowUp } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../assets/sku-logo.png'
import './Footer.css'

const quick = [
  { t: 'Home', h: '/' },
  { t: 'About Us', h: '/about' },
  { t: 'Services', h: '/services' },
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

const socials = [
  { name: 'Facebook', icon: FaFacebookF, url: '#' },
  { name: 'Instagram', icon: FaInstagram, url: '#' },
  { name: 'LinkedIn', icon: FaLinkedinIn, url: '#' },
]

export default function Footer() {
  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="ft-main">
        <div className="ft-col ft-brand">
          <Link to="/" className="ft-logo-text">
 
  <span className="ft-logo-divider"></span>
  <span className="ft-logo-name">
    <strong> SKU INFOTECH LTD</strong>
    <small>INNOVATE • DEVELOP • GROW</small>
  </span>
</Link>

          <p>
            We turn ideas into powerful digital solutions, helping businesses
            innovate, grow and lead with modern technology.
          </p>

          <div className="ft-social">
            {socials.map((social) => {
              const Icon = social.icon

              return (
                <a
                  href={social.url}
                  key={social.name}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>

        <div className="ft-col">
          <h4>Quick Links</h4>
          <ul>
            {quick.map((item) => (
              <li key={item.t}>
                <Link to={item.h}>
                  <ArrowRight size={14} />
                  {item.t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ft-col">
          <h4>Our Services</h4>
          <ul>
            {services.map((service) => (
              <li key={service}>
                <Link to="/services">
                  <ArrowRight size={14} />
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ft-bottom">
        <span>
          © {new Date().getFullYear()} SKU Infotech LTD. All rights reserved.
        </span>

        <div>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>

      <button
        type="button"
        className="to-top"
        onClick={handleTop}
        aria-label="Back to top"
      >
        <ArrowUp size={19} />
      </button>
    </footer>
  )
}
