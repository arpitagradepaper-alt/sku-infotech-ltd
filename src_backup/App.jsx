import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Services from './components/Services'
import About from './components/About'

export default function App() {
  return (
    <>
      <div className="bg-blob b1"></div>
      <div className="bg-blob b2"></div>
      <div className="bg-blob b3"></div>
      <div className="bg-ring"></div>
      <div className="bg-dots"></div>

      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <About />
    </>
  )
}
