import { useCallback, useEffect, useMemo, useState } from 'react'
import { Inbox, Mail, Clock, RefreshCw, Search, Phone, Reply, Trash2, MailOpen, X } from 'lucide-react'
import { getMessages, setMessageRead, deleteMessage } from '../messagesApi'
import { fmt, isToday } from '../utils'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(null)

  const load = useCallback(async () => {
    try {
      setMessages(await getMessages())
      setError('')
    } catch {
      setError('Could not load messages.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const setRead = async (m, read) => {
    setMessages((list) => list.map((x) => (x.id === m.id ? { ...x, read } : x)))
    setOpen((o) => (o && o.id === m.id ? { ...o, read } : o))
    try { await setMessageRead(m.id, read) } catch { load() }
  }

  const remove = async (m) => {
    if (!window.confirm('Delete this message permanently?')) return
    setMessages((list) => list.filter((x) => x.id !== m.id))
    setOpen(null)
    try { await deleteMessage(m.id) } catch { load() }
  }

  const view = (m) => {
    setOpen(m)
    if (!m.read) setRead(m, true)
  }

  const unread = messages.filter((m) => !m.read).length
  const today = messages.filter((m) => isToday(m.createdAt)).length

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase()
    return messages.filter((m) => {
      if (tab === 'unread' && m.read) return false
      if (tab === 'read' && !m.read) return false
      if (!s) return true
      return [m.name, m.email, m.phone, m.service, m.message].some((v) => (v || '').toLowerCase().includes(s))
    })
  }, [messages, tab, q])

  const tabs = [
    { id: 'all', label: 'All', n: messages.length },
    { id: 'unread', label: 'Unread', n: unread },
    { id: 'read', label: 'Read', n: messages.length - unread },
  ]

  return (
    <>
      <div className="ad-page-head">
        <div>
          <h2>Contact Messages</h2>
          <p>Enquiries sent from the website contact form.</p>
        </div>
        <button className="ad-refresh" onClick={() => { setLoading(true); load() }}>
          <RefreshCw size={16} className={loading ? 'spin' : ''} /> <span>Refresh</span>
        </button>
      </div>

      <section className="ad-stats">
        <div className="ad-stat"><Inbox size={22} /><div><b>{messages.length}</b><small>Total</small></div></div>
        <div className="ad-stat hot"><Mail size={22} /><div><b>{unread}</b><small>Unread</small></div></div>
        <div className="ad-stat"><Clock size={22} /><div><b>{today}</b><small>Today</small></div></div>
      </section>

      <section className="ad-tools">
        <label className="ad-search">
          <Search size={16} />
          <input placeholder="Search name, email, service, message..." value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className="ad-tabs">
          {tabs.map((t) => (
            <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}>
              {t.label} <i>{t.n}</i>
            </button>
          ))}
        </div>
      </section>

      {error && <div className="ad-error">{error}</div>}

      {loading && messages.length === 0 ? (
        <p className="ad-empty">Loading...</p>
      ) : shown.length === 0 && !error ? (
        <p className="ad-empty">No messages found.</p>
      ) : (
        <ul className="ad-list">
          {shown.map((m) => (
            <li
              key={m.id}
              className={'ad-item' + (m.read ? '' : ' unread')}
              role="button"
              tabIndex={0}
              onClick={() => view(m)}
              onKeyDown={(e) => e.key === 'Enter' && view(m)}
            >
              <span className="ad-dot"></span>
              <div className="ad-who"><b>{m.name}</b><small>{m.email}</small></div>
              <div className="ad-snip">
                <span className="ad-tag">{m.service || 'General'}</span>
                <p>{m.message}</p>
              </div>
              <time>{fmt(m.createdAt)}</time>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <div className="ad-modal" onClick={() => setOpen(null)}>
          <div className="ad-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="ad-sheet-head">
              <div>
                <h2>{open.name}</h2>
                <small>{fmt(open.createdAt)}</small>
              </div>
              <button className="ad-x" onClick={() => setOpen(null)} aria-label="Close"><X size={20} /></button>
            </div>

            <div className="ad-meta">
              <a href={'mailto:' + open.email}><Mail size={15} /> {open.email}</a>
              {open.phone && <a href={'tel:' + open.phone}><Phone size={15} /> {open.phone}</a>}
              <span className="ad-tag">{open.service || 'General'}</span>
            </div>

            <div className="ad-body">{open.message}</div>

            <div className="ad-actions">
              <a className="ad-btn primary" href={'mailto:' + open.email + '?subject=' + encodeURIComponent('Re: your enquiry - SKU Infotech Ltd')}>
                <Reply size={16} /> Reply by email
              </a>
              <button className="ad-btn" onClick={() => setRead(open, !open.read)}>
                {open.read ? <><Mail size={16} /> Mark unread</> : <><MailOpen size={16} /> Mark read</>}
              </button>
              <button className="ad-btn danger" onClick={() => remove(open)}>
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}