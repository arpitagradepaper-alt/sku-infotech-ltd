import { useState } from 'react'
import { Send, MessageCircle, CheckCircle2 } from 'lucide-react'
import './ContactPage.css'

const WHATSAPP_NUMBER = '447776597878'


const services = [
  'Web Development',
  'Mobile App Development',
  'E-Commerce',
  'UI/UX Design',
  'Cloud Solutions',
  'Cyber Security',
  'Digital Marketing',
  'IT Support',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const [status, setStatus] = useState('idle') // idle | done

  const buildWhatsappUrl = () => {
    const text = [
      'Hello SKU INFOTECH LTD!',
      '',
      'I would like to discuss a project.',
      '',
      'Name: ' + form.name,
      'Email: ' + form.email,
      'Phone: ' + form.phone,
      'Service: ' + form.service,
      '',
      'Project Details:',
      form.message,
    ].join('\n')

    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text)
  }

  // Form submit par sirf "Thank you" screen dikhao
  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('done')
  }

  const handleReset = () => {
    setForm({ name: '', email: '', phone: '', service: '', message: '' })
    setStatus('idle')
  }

  return (
    <main className="contact-page">

      <section className="contact-heading">
        <span className="contact-tag">CONTACT US</span>

        <h1>
          Let's Talk About Your <span>Project</span>
        </h1>

        <p>
          Have a project in mind or need a technology partner?
          Tell us what you need and let's make it happen.
        </p>
      </section>

      <section className="contact-form-section">

        <div className="contact-form-card">

          {status === 'done' ? (
            <div className="contact-success" role="status" aria-live="polite">
              <div className="contact-success-icon">
                <CheckCircle2 size={44} />
              </div>
              <h2>Thank you, {form.name.split(' ')[0] || 'there'}!</h2>
              <p>
                Your enquiry is ready. Tap the button below to send it to our team on WhatsApp.
              </p>
              <div className="contact-success-btns">
                <a
                  className="contact-success-wa"
                  href={buildWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={17} />
                  Send on WhatsApp
                </a>
                <button type="button" className="contact-success-again" onClick={handleReset}>
                  Send another enquiry
                </button>
              </div>
            </div>
          ) : (
          <>

          <div className="contact-form-heading">
            <span>GET IN TOUCH</span>
            <h2>Send Us a Message</h2>
            <p>
              Share a few details about your project.
              Our team would love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="contact-form-row">

              <div className="contact-field">
                <label htmlFor="contact-name">Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="contact-form-row">

              <div className="contact-field">
                <label htmlFor="contact-phone">Phone Number *</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-service">Service Required *</label>
                <select
                  id="contact-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Tell Us About Your Project *</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Describe your project or requirements..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit">
              Send Your Enquiry
              <Send size={17} />
            </button>

            <div className="contact-form-bottom">
              <CheckCircle2 size={15} />
              <span>Your information is safe and will only be used to respond to your enquiry.</span>
            </div>

          </form>
          </>
        )}
        </div>

        <div className="contact-bottom-text">
          <MessageCircle size={19} />
          <p>Have a great idea? <strong>Let's turn it into reality.</strong></p>
        </div>

      </section>

    </main>
  )
}
