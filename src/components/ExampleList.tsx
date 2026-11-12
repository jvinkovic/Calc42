import { useState } from 'react'
import { c, format } from '../lib/complex'
import type { CalculatorDef } from '../lib/machine'
import type { Example } from '../examples/types'
import { StepsList } from './StepsList'

const PREVIEW = 14

interface Props {
  calc: CalculatorDef
  examples: Example[]
  onLoad: (ex: Example) => void
  active: Example | null
}

export function ExampleList({ calc, examples, onLoad, active }: Props) {
  const [open, setOpen] = useState<Set<string>>(new Set())
  const label = (t: string) => calc.buttons.find((b) => b.token === t)?.label ?? t

  const toggle = (name: string) => {
    const next = new Set(open)
    if (next.has(name)) next.delete(name)
    else next.add(name)
    setOpen(next)
  }

  return (
    <section className="examples">
      <h2>Try an example</h2>
      <p className="muted">
        Every program below uses only the {calc.buttons.length} buttons above. Load one, or open its steps and press the
        buttons yourself.
      </p>
      <div className="grid">
        {examples.map((ex) => {
          const preview = ex.tokens.slice(0, PREVIEW).map(label).join(' ')
          const isOpen = open.has(ex.name)
          return (
            <article key={ex.name} className={`card${active === ex ? ' active' : ''}${isOpen ? ' wide' : ''}`}>
              <header>
                <h3>{ex.name}</h3>
                <span className="badge">K = {ex.tokens.length}</span>
              </header>
              <p className="math">{ex.formula}</p>
              <p className="value">
                = {format(ex.expected(c(ex.x ?? 0)))}
                {calc.hasX && ex.x !== undefined && <span className="muted"> at x = {ex.x}</span>}
              </p>
              <p className="preview">
                <code>{preview}{ex.tokens.length > PREVIEW ? ' …' : ''}</code>
              </p>
              {ex.note && <p className="note">{ex.note}</p>}
              <div className="card-actions">
                <button className="primary" onClick={() => onLoad(ex)}>Load</button>
                <button className={isOpen ? 'on' : ''} aria-expanded={isOpen} onClick={() => toggle(ex.name)}>
                  {isOpen ? 'Hide steps' : 'Show steps'}
                </button>
              </div>
              {isOpen && <StepsList calc={calc} ex={ex} />}
            </article>
          )
        })}
      </div>
    </section>
  )
}
