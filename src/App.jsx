import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import AdminLayout from './admin/AdminLayout'
import DashboardHome from './admin/pages/DashboardHome'
import Messages from './admin/pages/Messages'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function Shell() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />

      {!isAdmin && (
        <>
          <div className="bg-blob b1"></div>
          <div className="bg-blob b2"></div>
          <div className="bg-blob b3"></div>
          <div className="bg-ring"></div>
          <div className="bg-dots"></div>
          <Navbar />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
