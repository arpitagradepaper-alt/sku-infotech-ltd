import { useEffect, useState } from 'react'
import logo from '../assets/sku-logo.png'
import './Intro.css'

export default function Intro() {
  const [show, setShow] = useState(
    () => !sessionStorage.getItem('skuIntroSeen')
  )

  useEffect(() => {
    if (!show) return

    const timer = setTimeout(() => {
      sessionStorage.setItem('skuIntroSeen', 'true')
      setShow(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [show])

  if (!show) return null

  const skip = () => {
    sessionStorage.setItem('skuIntroSeen', 'true')
    setShow(false)
  }

  return (
    <div className="sku-opening">

      <div className="opening-glow glow-left"></div>
      <div className="opening-glow glow-right"></div>

      <div className="opening-orbit orbit-one"></div>
      <div className="opening-orbit orbit-two"></div>
      <div className="opening-orbit orbit-three"></div>

      <div className="opening-content">

        <div className="opening-logo">
          <div className="opening-logo-light"></div>
          <img src={logo} alt="SKU INFOTECH LTD" />
        </div>

        <div className="opening-line"></div>

        <h2 className="opening-title">
          INNOVATE <span>•</span> DEVELOP <span>•</span> GROW
        </h2>

        <p className="opening-subtitle">
          Building Tomorrow Through Technology
        </p>

        <div className="opening-progress">
          <span></span>
        </div>

      </div>

      <div className="opening-bottom">
        <span>SKU INFOTECH LTD</span>
        <span>WELCOME TO OUR WORLD</span>
      </div>

      <button className="opening-skip" onClick={skip}>
        Skip Intro <span>→</span>
      </button>

    </div>
  )
}
