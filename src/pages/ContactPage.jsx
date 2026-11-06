import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Clock, Send, Check, ChevronRight, MessageCircle, AlertCircle } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import './ContactPage.css'

const MAP_QUERY = 'India'

const info = [
  { icon: <Mail size={22} />, t: 'Email Us', v: 'hello@skuinfotech.com', s: 'We reply within 24 hours' },
  { icon: <Phone size={22} />, t: 'Call Us', v: '+ 447776597878', s: 'Mon to Sat, 10 AM to 7 PM' },
  { icon: <MapPin size={22} />, t: 'Visit Us', v: ' Address', s: 'Meet us for a free consultation' },
  { icon: <Clock size={22} />, t: 'Working Hours', v: 'Mon - Sat: 10 AM - 7 PM', s: 'Sunday closed' },
]

const options = ['Web Development', 'Mobile App Development', 'E-Commerce Solutions', 'UI/UX Design', 'Branding & Graphics', 'Cloud Solutions', 'Cyber Security', 'IT Support & Maintenance', 'Digital Marketing', 'Other']
const strip = ['Free Consultation', 'Clear Estimate', 'No Obligation', 'Quick Reply', 'Let\u2019s Talk']
const empty = { name: '', email: '', phone: '', service: '', message: '', botcheck: '' }

export default function ContactPage() {
  useReveal()
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | loading | ok | error

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (form.botcheck) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setStatus(data.success ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => { setForm(empty); setStatus('idle') }
  const loop = [...strip, ...strip, ...strip, ...strip]

  return (
    <main className="cp">
      {/* ---------- Hero ---------- */}
      <section className="cp-hero">
        <div className="sp-crumb">
          <Link to="/">Home</Link> <ChevronRight size={14} /> <b>Contact</b>
        </div>
        <div className="sv-label">
          <span className="line l-left"></span>
          Contact Us
          <span className="line l-right"></span>
        </div>
        <h1>Let&apos;s Build Something <span>Great Together</span></h1>
        <p>Tell us about your idea and get a free consultation with a clear estimate. No obligation.</p>
      </section>

      {/* ---------- Info cards ---------- */}
      <section className="cp-info">
        {info.map((c, i) => (
          <div className="cp-card reveal" key={c.t} style={{ '--d': `${i * 0.1}s`, '--i': i }}>
            <div className="cp-card-in">
              <div className="cp-ic">{c.icon}</div>
              <h4>{c.t}</h4>
              <b>{c.v}</b>
              <small>{c.s}</small>
            </div>
          </div>
        ))}
      </section>

      {/* ---------- Form + side ---------- */}
      <section className="cp-main">
        <div className="cp-form-wrap reveal">
          <span className="cf-blob"></span>

          {status === 'ok' ? (
            <div className="cf-success">
              <div className="cf-tick"><Check size={44} strokeWidth={3} /></div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. Our team will contact you very soon.</p>
              <button className="btn-gold" onClick={reset}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="cf-head">
                <div className="cf-head-ic"><MessageCircle size={22} /></div>
                <div>
                  <h3>Send Us a Message</h3>
                  <small>We usually reply within 24 hours</small>
                </div>
              </div>

              <input type="text" name="botcheck" className="cf-bot" tabIndex="-1" autoComplete="off"
                value={form.botcheck} onChange={set('botcheck')} />

              <div className="cf-row">
                <div className="cf-field">
                  <input id="cf-name" required placeholder=" " value={form.name} onChange={set('name')} />
                  <label htmlFor="cf-name">Your Name</label>
                </div>
                <div className="cf-field">
                  <input id="cf-email" type="email" required placeholder=" " value={form.email} onChange={set('email')} />
                  <label htmlFor="cf-email">Email Address</label>
                </div>
              </div>

              <div className="cf-row">
                <div className="cf-field">
                  <input id="cf-phone" type="tel" placeholder=" " value={form.phone} onChange={set('phone')} />
                  <label htmlFor="cf-phone">Phone Number</label>
                </div>
                <div className="cf-field has-value">
                  <select id="cf-service" required value={form.service} onChange={set('service')}>
                    <option value="" disabled>Select a service</option>
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <label htmlFor="cf-service">Service Needed</label>
                </div>
              </div>

              <div className="cf-field">
                <textarea id="cf-msg" required rows="5" placeholder=" " value={form.message} onChange={set('message')}></textarea>
                <label htmlFor="cf-msg">Tell us about your project</label>
              </div>

              {status === 'error' && (
                <div className="cf-error"><AlertCircle size={16} /> Something went wrong. Please try again or email us directly.</div>
              )}

              <button className="btn-gold cf-submit" disabled={status === 'loading'}>
                {status === 'loading' ? (<><span className="cf-spin"></span> Sending...</>) : (<>Send Message <Send size={16} /></>)}
              </button>
            </form>
          )}
        </div>

        <div className="cp-side reveal" style={{ '--d': '.15s' }}>
          <div className="cp-map">
            <iframe
              title="Our location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="cp-note">
            <div className="cp-note-ic"><Check size={18} /></div>
            <div>
              <b>What happens next?</b>
              <p>We review your message, call you to understand your needs, and share a clear plan and estimate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Strip ---------- */}
      <div className="cp-strip">
        <div className="cp-track">
          {loop.map((t, i) => (<span key={i}><i></i>{t}</span>))}
        </div>
      </div>
    </main>
  )
}