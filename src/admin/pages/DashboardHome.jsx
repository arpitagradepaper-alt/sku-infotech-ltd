import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Inbox, Mail, Clock, CalendarDays, ArrowRight } from 'lucide-react'
import { getMessages, CHANGED } from '../messagesApi'
import { fmt, isToday, isThisWeek } from '../utils'

export default function DashboardHome() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let on = true
    const load = () =>
      getMessages()
        .then((l) => {
          if (!on) return
          setMessages(l)
          setError('')
        })
        .catch(() => {
          if (on) setError('Could not load messages. Is the server running?')
        })
        .finally(() => {
          if (on) setLoading(false)
        })
    load()
    window.addEventListener(CHANGED, load)
    return () => {
      on = false
      window.removeEventListener(CHANGED, load)
    }
  }, [])

  const unread = messages.filter((m) => !m.read).length
  const today = messages.filter((m) => isToday(m.createdAt)).length
  const week = messages.filter((m) => isThisWeek(m.createdAt)).length

  const byService = useMemo(() => {
    const map = {}
    messages.forEach((m) => {
      const k = m.service || 'General'
      map[k] = (map[k] || 0) + 1
    })
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5)
  }, [messages])
  const max = byService.length ? byService[0][1] : 1

  return (
    <>
      <div className="ad-hello">
        <h2>Welcome back, Admin</h2>
        <p>Here is a quick look at the enquiries coming from your website.</p>
      </div>

      {error && <div className="ad-error">{error}</div>}

      <section className="ad-stats four">
        <div className="ad-stat"><Inbox size={22} /><div><b>{messages.length}</b><small>Total messages</small></div></div>
        <div className="ad-stat hot"><Mail size={22} /><div><b>{unread}</b><small>Unread</small></div></div>
        <div className="ad-stat"><Clock size={22} /><div><b>{today}</b><small>Today</small></div></div>
        <div className="ad-stat"><CalendarDays size={22} /><div><b>{week}</b><small>Last 7 days</small></div></div>
      </section>

      <div className="ad-grid2">
        <section className="ad-card">
          <div className="ad-card-head">
            <h3>Recent messages</h3>
            <Link to="/admin/messages">View all <ArrowRight size={14} /></Link>
          </div>
          {loading ? (
            <p className="ad-empty">Loading...</p>
          ) : messages.length === 0 ? (
            <p className="ad-empty">No messages yet.</p>
          ) : (
            <ul className="ad-recent">
              {messages.slice(0, 5).map((m) => (
                <li key={m.id}>
                  <Link to="/admin/messages" className={'ad-row' + (m.read ? '' : ' unread')}>
                    <span className="ad-dot"></span>
                    <div className="ad-who"><b>{m.name}</b><small>{m.service || 'General'}</small></div>
                    <time>{fmt(m.createdAt)}</time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="ad-card">
          <div className="ad-card-head"><h3>Messages by service</h3></div>
          {byService.length === 0 ? (
            <p className="ad-empty">No data yet.</p>
          ) : (
            <ul className="ad-bars">
              {byService.map(([name, n]) => (
                <li key={name}>
                  <div className="ad-bar-top"><span>{name}</span><b>{n}</b></div>
                  <div className="ad-track"><span style={{ width: (n / max) * 100 + '%' }}></span></div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}