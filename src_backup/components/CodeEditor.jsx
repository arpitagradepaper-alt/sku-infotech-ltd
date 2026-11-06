import { useEffect, useState } from 'react'
import { Users, Zap, Headphones } from 'lucide-react'
import './CodeEditor.css'

const CODE = `const company = {
  name: "SKU Infotech LTD",
  motto: ["Innovate", "Develop", "Grow"],
  clients: "10K+",
  delivery: "95% faster",
  support: "24/7",
};

function buildFuture(idea) {
  const product = develop(idea);
  return launch(product);
}

buildFuture("Your Idea");
// Smarter Tomorrow`

const TOTAL_LINES = CODE.split('\n').length
const RE = /(\/\/.*$)|("[^"]*"?)|\b(const|function|return)\b|\b([a-zA-Z_]+)(?=\()|(\b\d+[A-Za-z%+]*)/g

function highlight(line) {
  const out = []
  let last = 0
  let m
  RE.lastIndex = 0
  while ((m = RE.exec(line)) !== null) {
    if (m.index > last) out.push(line.slice(last, m.index))
    const cls = m[1] ? 'c-com' : m[2] ? 'c-str' : m[3] ? 'c-kw' : m[4] ? 'c-fn' : 'c-num'
    out.push(<span key={m.index} className={cls}>{m[0]}</span>)
    last = m.index + m[0].length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

export default function CodeEditor() {
  const [n, setN] = useState(0)

  useEffect(() => {
    const done = n >= CODE.length
    const t = setTimeout(
      () => setN(done ? 0 : n + 1),
      done ? 3000 : CODE[n] === '\n' ? 140 : 45
    )
    return () => clearTimeout(t)
  }, [n])

  const lines = CODE.slice(0, n).split('\n')

  return (
    <div className="ce-wrap">
      <div className="ce-glow"></div>

      <div className="ce-badge b-a"><Users size={16} /> 10K+ Clients</div>
      <div className="ce-badge b-b"><Zap size={16} /> 95% Faster</div>
      <div className="ce-badge b-c"><Headphones size={16} /> 24/7 Support</div>

      <div className="ce-window">
        <div className="ce-bar">
          <span className="dot d1"></span>
          <span className="dot d2"></span>
          <span className="dot d3"></span>
          <div className="ce-tabs">
            <span className="tab active">app.js</span>
            <span className="tab">styles.css</span>
          </div>
        </div>

        <div className="ce-body">
          <div className="ce-nums">
            {Array.from({ length: TOTAL_LINES }, (_, i) => (
              <div key={i} className={i < lines.length ? 'on' : ''}>{i + 1}</div>
            ))}
          </div>
          <pre className="ce-code">
            {lines.map((l, i) => (
              <div key={i} className="ce-line">
                {highlight(l)}
                {i === lines.length - 1 && <span className="ce-cursor"></span>}
              </div>
            ))}
          </pre>
        </div>

        <div className="ce-status">
          <span><i></i> Live</span>
          <span>JavaScript</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  )
}
