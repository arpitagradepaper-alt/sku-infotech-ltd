import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, X, Send, Mail, Phone, ArrowRight } from 'lucide-react'
import { COMPANY, SERVICES, WELCOME, MAIN_CHIPS, getReply, findService } from './knowledge'
import './Chatbot.css'

const EMAIL_RE = /^\S+@\S+\.\S+$/
const PHONE_RE = /^[0-9+()\-\s]{6,20}$/
const CANCEL = { l: 'Cancel', q: 'cancel' }
const SKIP = { l: 'Skip', q: 'skip' }
const isMobile = () => window.matchMedia('(max-width: 520px)').matches

const PLACEHOLDER = {
  name: 'Your name',
  email: 'you@example.com',
  phone: 'Phone number (or tap Skip)',
  service: 'Pick a service or type one',
  message: 'Describe your project',
  confirm: 'Tap Yes, send it',
}

function Inline({ text }) {
  return text.split('**').map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>))
}

function Lines({ lines }) {
  const groups = []
  lines.forEach((ln) => {
    const li = ln.startsWith('- ')
    const last = groups[groups.length - 1]
    if (li && last && last.list) last.items.push(ln.slice(2))
    else groups.push({ list: li, items: [li ? ln.slice(2) : ln] })
  })
  return groups.map((g, gi) =>
    g.list ? (
      <ul key={gi}>{g.items.map((t, i) => <li key={i}><Inline text={t} /></li>)}</ul>
    ) : (
      <p key={gi}><Inline text={g.items[0]} /></p>
    )
  )
}

export default function Chatbot() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(false)
  const [messages, setMessages] = useState([])
  const [pending, setPending] = useState(0)
  const [input, setInput] = useState('')
  const [lead, setLead] = useState(null)
  const [vv, setVv] = useState(null)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const idRef = useRef(0)
  const timers = useRef([])
  const busyUntil = useRef(0)
  const typing = pending > 0

  const push = (m) => {
    const id = ++idRef.current
    setMessages((list) => [...list, { id, ...m }])
  }

  const botSay = (reply, delay) => {
    const ms = delay ?? Math.min(450 + reply.text.join(' ').length * 6, 1400)
    const at = Math.max(Date.now(), busyUntil.current) + ms
    busyUntil.current = at
    setPending((n) => n + 1)
    timers.current.push(setTimeout(() => {
      push({ from: 'bot', reply })
      setPending((n) => n - 1)
    }, at - Date.now()))
  }

  useEffect(() => {
    const t1 = setTimeout(() => setHint(true), 4000)
    const t2 = setTimeout(() => setHint(false), 15000)
    const all = timers.current
    return () => { clearTimeout(t1); clearTimeout(t2); all.forEach(clearTimeout) }
  }, [])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, pending, open])

  useEffect(() => {
    if (!open) return
    document.body.classList.add('cb-open')
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    const v = window.visualViewport
    const upd = () => v && setVv({ h: v.height, t: v.offsetTop })
    if (v) { upd(); v.addEventListener('resize', upd); v.addEventListener('scroll', upd) }
    return () => {
      document.body.classList.remove('cb-open')
      document.documentElement.classList.remove('cb-lock')
      window.removeEventListener('keydown', onKey)
      if (v) { v.removeEventListener('resize', upd); v.removeEventListener('scroll', upd) }
    }
  }, [open])

  const openChat = () => {
    setOpen(true)
    setHint(false)
    if (messages.length === 0 && pending === 0) botSay(WELCOME, 500)
    timers.current.push(setTimeout(() => {
      if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus()
    }, 120))
  }

  const restart = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    busyUntil.current = 0
    setPending(0)
    setMessages([])
    setLead(null)
    setInput('')
    botSay(WELCOME, 400)
  }

  const goTo = (to) => {
    navigate(to)
    if (isMobile()) setOpen(false)
  }

  const fit = (el) => {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 96) + 'px'
  }

  const startLead = () => {
    setLead({ step: 'name', data: {} })
    botSay({ text: ['Happy to connect you with our team.', 'First, what is your name?'], chips: [CANCEL] })
  }

  const sendLead = (data) => {
    setLead({ step: 'sending', data })
    setPending((n) => n + 1)
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, service: data.service, message: '[Sent from website chatbot] ' + data.message, botcheck: '' }),
    })
      .then(async (res) => {
        let body = {}
        try { body = await res.json() } catch { body = {} }
        return { ok: res.ok && body.success === true, error: body.error }
      })
      .catch(() => ({ ok: false }))
      .then((r) => {
        setPending((n) => n - 1)
        if (r.ok) {
          setLead(null)
          push({ from: 'bot', reply: { text: ['Thank you, ' + data.name.split(' ')[0] + '! Your message has been sent.', 'Our team will contact you very soon.'], chips: MAIN_CHIPS } })
        } else {
          setLead({ step: 'confirm', data })
          push({ from: 'bot', reply: { text: [r.error || 'Sorry, I could not send your message right now.', 'You can try again, or email us at ' + COMPANY.email + '.'],
            chips: [{ l: 'Try again', q: 'yes' }, CANCEL], actions: [{ l: 'Email us', href: 'mailto:' + COMPANY.email, icon: 'mail' }] } })
        }
      })
  }

  const handleLead = (q) => {
    const t = q.trim()
    if (/^(cancel|stop|exit|quit|never ?mind)$/i.test(t)) {
      setLead(null)
      botSay({ text: ['No problem, I have cancelled that.', 'Is there anything else I can help you with?'], chips: MAIN_CHIPS })
      return
    }
    const data = { ...lead.data }
    const go = (step, reply) => { setLead({ step, data }); botSay(reply) }
    const again = (msg, chips) => botSay({ text: [msg], chips: chips || [CANCEL] })

    switch (lead.step) {
      case 'name':
        if (t.length < 2 || t.length > 100) return again('Please enter your name (2 to 100 characters).')
        data.name = t
        return go('email', { text: ['Nice to meet you, ' + t.split(' ')[0] + '!', 'What is your email address?'], chips: [CANCEL] })
      case 'email':
        if (!EMAIL_RE.test(t) || t.length > 150) return again('That email does not look right. Please check it and try again.')
        data.email = t
        return go('phone', { text: ['Thanks! What is your phone number? This is optional.'], chips: [SKIP, CANCEL] })
      case 'phone':
        if (/^skip$/i.test(t)) data.phone = ''
        else if (PHONE_RE.test(t)) data.phone = t
        else return again('Please enter a valid phone number, or tap Skip.', [SKIP, CANCEL])
        return go('service', { text: ['Which service are you interested in?'],
          chips: [...SERVICES.map((s) => ({ l: s.title, q: s.title })), { l: 'Other', q: 'Other' }, CANCEL] })
      case 'service': {
        const s = findService(t)
        data.service = s ? s.title : t.slice(0, 100)
        return go('message', { text: ['Great. Please tell us a little about your project or question.'], chips: [CANCEL] })
      }
      case 'message':
        if (t.length < 5) return again('Please add a few more words so our team can help you better.')
        if (t.length > 2500) return again('That is a bit long. Please shorten it to under 2500 characters.')
        data.message = t
        return go('confirm', { text: ['Please check your details:',
          '- **Name:** ' + data.name.replace(/\*\*/g, ''),
          '- **Email:** ' + data.email.replace(/\*\*/g, ''),
          '- **Phone:** ' + (data.phone || 'not given'),
          '- **Service:** ' + data.service.replace(/\*\*/g, ''),
          '- **Message:** ' + data.message.replace(/\*\*/g, ''),
          'Shall I send this to our team?'],
        chips: [{ l: 'Yes, send it', q: 'yes' }, { l: 'Start again', q: 'start again' }, CANCEL] })
      case 'confirm':
        if (/^(y|yes|yeah|yep|send|send it|ok|okay|sure|confirm|submit|go ahead)\b/i.test(t)) return sendLead(data)
        if (/^(edit|change|start again|redo)/i.test(t)) return startLead()
        return again('Please tap Yes, send it, Start again or Cancel.', [{ l: 'Yes, send it', q: 'yes' }, { l: 'Start again', q: 'start again' }, CANCEL])
      default:
        return undefined
    }
  }

  const submit = (label, query) => {
    const text = (label || '').trim()
    if (!text || lead?.step === 'sending') return
    push({ from: 'user', text })
    setInput('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
    const q = query ?? text
    if (lead) return handleLead(q)
    const reply = getReply(q)
    if (reply.action === 'lead') return startLead()
    botSay(reply)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit(input)
    }
  }

  const step = lead?.step
  const last = messages[messages.length - 1]
  const chips = !typing && last && last.from === 'bot' ? last.reply.chips : null
  const panelStyle = vv ? { '--cb-vh': vv.h + 'px', '--cb-top': vv.t + 'px' } : undefined

  return (
    <div className="cb-root">
      {!open && hint && (
        <div className="cb-hint" role="status">
          <button type="button" className="cb-hint-text" onClick={openChat}>Hi! Need help with your project?</button>
          <button type="button" className="cb-hint-x" aria-label="Dismiss" onClick={() => setHint(false)}><X size={14} /></button>
        </div>
      )}

      <button type="button" className={'cb-launcher' + (open ? ' is-open' : '')} aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open} onClick={() => (open ? setOpen(false) : openChat())}>
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {open && (
        <section className="cb-panel" role="dialog" aria-label="SKU Infotech assistant" style={panelStyle}>
          <header className="cb-hd">
            <div className="cb-avatar">S<i></i></div>
            <div className="cb-hd-title">
              <h2>SKU Assistant</h2>
              <small>Online - replies instantly</small>
            </div>
            <button type="button" className="cb-hd-btn cb-hd-txt" onClick={restart}>Restart</button>
            <button type="button" className="cb-hd-btn" aria-label="Close chat" onClick={() => setOpen(false)}><X size={20} /></button>
          </header>

          <div className="cb-list" ref={listRef} role="log" aria-live="polite">
            {messages.map((m) =>
              m.from === 'user' ? (
                <div className="cb-row user" key={m.id}><div className="cb-bubble user">{m.text}</div></div>
              ) : (
                <div className="cb-row bot" key={m.id}>
                  <div className="cb-bubble bot">
                    <Lines lines={m.reply.text} />
                    {(m.reply.links || m.reply.actions) && (
                      <div className="cb-acts">
                        {(m.reply.actions || []).map((a) => (
                          <a className="cb-act" key={a.l} href={a.href}>{a.icon === 'phone' ? <Phone size={14} /> : <Mail size={14} />}{a.l}</a>
                        ))}
                        {(m.reply.links || []).map((a) => (
                          <button type="button" className="cb-act" key={a.l} onClick={() => goTo(a.to)}>{a.l}<ArrowRight size={14} /></button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
            {typing && <div className="cb-row bot"><div className="cb-bubble bot cb-typing" aria-label="Assistant is typing"><i></i><i></i><i></i></div></div>}
            {chips && (
              <div className="cb-chips">
                {chips.map((c) => <button type="button" className="cb-chip" key={c.l} onClick={() => submit(c.l, c.q)}>{c.l}</button>)}
              </div>
            )}
          </div>

          <form className="cb-form" onSubmit={(e) => { e.preventDefault(); submit(input) }}>
            <textarea ref={inputRef} rows={1} value={input} enterKeyHint="send" disabled={step === 'sending'}
              maxLength={step === 'message' ? 2500 : 500}
              inputMode={step === 'email' ? 'email' : step === 'phone' ? 'tel' : 'text'}
              autoComplete={step === 'name' ? 'name' : step === 'email' ? 'email' : step === 'phone' ? 'tel' : 'off'}
              placeholder={PLACEHOLDER[step] || 'Type your question...'}
              aria-label="Type your message"
              onChange={(e) => { setInput(e.target.value); fit(e.target) }} onKeyDown={onKeyDown} />
            <button type="submit" className="cb-send" aria-label="Send message" disabled={!input.trim() || step === 'sending'}><Send size={18} /></button>
          </form>
        </section>
      )}
    </div>
  )
}
