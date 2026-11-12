import { useMemo, useState } from 'react'
import { c, format } from '../lib/complex'
import { buttonMap, run, type CalculatorDef } from '../lib/machine'
import type { Example } from '../examples/types'

const PAGE = 60

export function StepsList({ calc, ex }: { calc: CalculatorDef; ex: Example }) {
  const [limit, setLimit] = useState(PAGE)
  const labels = useMemo(() => buttonMap(calc), [calc])
  const snapshots = useMemo(() => run(ex.tokens, calc, c(ex.x ?? 0)).snapshots, [ex, calc])
  const n = ex.tokens.length

  return (
    <div className="steps">
      {calc.hasX && ex.x !== undefined && (
        <p>First type <code>{ex.x}</code> into the x box.</p>
      )}
      <ol>
        {ex.tokens.slice(0, limit).map((t, k) => {
          const stack = snapshots[k + 1]
          return (
            <li key={k}>
              Press <kbd>{labels.get(t)?.label ?? t}</kbd>
              <span className="muted">
                {' '}→ {format(stack[stack.length - 1])}
                {stack.length > 1 && ` (${stack.length} on stack)`}
              </span>
            </li>
          )
        })}
      </ol>
      {limit < n && (
        <button className="link" onClick={() => setLimit(n)}>
          Show all {n} steps
        </button>
      )}
      <p className="muted">Each arrow shows the value on top of the stack after that press.</p>
    </div>
  )
}
