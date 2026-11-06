
import { Users, Zap, TrendingUp, Headphones } from 'lucide-react'
import './StatsBar.css'

const stats = [
  { icon: <Users size={36} />, num: '10K+', label: 'Happy Clients' },
  { icon: <Zap size={36} />, num: '95%', label: 'Faster Delivery' },
  { icon: <TrendingUp size={36} />, num: '40%', label: 'Business Growth' },
  { icon: <Headphones size={36} />, num: '24/7', label: 'Support' },
]

export default function StatsBar() {
  return (
    <div className="stats-wrap">
      <div className="stats-bar">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <span className="stat-icon">{s.icon}</span>
            <div>
              <h3>{s.num}</h3>
              <small>{s.label}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
