import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, Menu, X, ExternalLink } from 'lucide-react'
import { getMessages, CHANGED } from './messagesApi'
import './admin.css'

const navCls = ({ isActive }) => 'ad-nav' + (isActive ? ' active' : '')

export default function AdminLayout() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    let on = true
    const load = () => getMessages().then((l) => on && setUnread(l.filter((m) => !m.read).length))
    load()
    window.addEventListener(CHANGED, load)
    return () => {
      on = false
      window.removeEventListener(CHANGED, load)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const title = pathname.startsWith('/admin/messages') ? 'Contact Messages' : 'Dashboard'

  return (
    <div className="ad-shell">
      <aside className={'ad-side' + (open ? ' open' : '')}>
        <div className="ad-side-head">
          <div className="ad-brand">
            <div className="ad-logo">S</div>
            <div>
              <b>SKU Infotech</b>
              <small>Admin Panel</small>
            </div>
          </div>
          <button className="ad-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>

        <nav className="ad-navs">
          <small className="ad-nav-label">Main</small>
          <NavLink to="/admin" end className={navCls}><LayoutDashboard size={18} /> Dashboard</NavLink>
          <NavLink to="/admin/messages" className={navCls}>
            <MessageSquare size={18} /> Contact Messages
            {unread > 0 && <em>{unread}</em>}
          </NavLink>
        </nav>

        <Link to="/" className="ad-side-foot"><ExternalLink size={16} /> View website</Link>
      </aside>

      {open && <div className="ad-overlay" onClick={() => setOpen(false)}></div>}

      <div className="ad-main">
        <header className="ad-bar">
          <button className="ad-burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          <h1>{title}</h1>
          <div className="ad-user">
            <span>Admin</span>
            <div className="ad-avatar">A</div>
          </div>
        </header>
        <div className="ad-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
