import { useMemo, useState } from 'react'
import type { CalculatorDef } from '../lib/machine'
import { bracketStyle, flatten, toTrees, type Flat } from '../lib/tree'

const CHAR_BUDGET = 2000

function Formula({ flat }: { flat: Flat }) {
  const [active, setActive] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const total = useMemo(() => flat.segments.reduce((n, s) => n + s.text.length, 0), [flat])
  const cut = useMemo(() => {
    if (showAll || total <= CHAR_BUDGET) return flat.segments.length
    let n = 0
    for (let k = 0; k < flat.segments.length; k++) {
      n += flat.segments[k].text.length
      if (n > CHAR_BUDGET) return k
    }
    return flat.segments.length
  }, [flat, showAll, total])

  const range = active === null ? null : flat.groups[active]

  return (
    <div className="formula">
      <code onMouseLeave={() => setActive(null)}>
        {flat.segments.slice(0, cut).map((s, k) => {
          const inside = range !== null && k >= range[0] && k <= range[1]
          if (s.kind === 'text') {
            return <span key={k} className={inside ? 'hl' : undefined}>{s.text}</span>
          }
          const { color } = bracketStyle(s.depth)
          return (
            <span
              key={k}
              className={`br c${color}${inside ? ' hl' : ''}${active === s.group ? ' match' : ''}`}
              onMouseEnter={() => setActive(s.group)}
              onClick={() => setActive(active === s.group ? null : s.group)}
            >
              {s.text}
            </span>
          )
        })}
        {cut < flat.segments.length && <span className="muted"> …</span>}
      </code>
      {total > CHAR_BUDGET && (
        <button className="link" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show less' : `Show all ${total.toLocaleString()} characters`}
        </button>
      )}
    </div>
  )
}

export function FormulaView({ tokens, calc }: { tokens: readonly string[]; calc: CalculatorDef }) {
  const flats = useMemo(() => toTrees(tokens, calc).map((t) => flatten(t, calc)), [tokens, calc])
  if (flats.length === 0) return <p className="muted">Press a button to start a formula.</p>
  return (
    <div className="formulas">
      {flats.length > 1 && (
        <p className="muted">The stack holds {flats.length} values. Each is shown on its own line, bottom first.</p>
      )}
      {flats.map((f, k) => <Formula key={k} flat={f} />)}
    </div>
  )
}
