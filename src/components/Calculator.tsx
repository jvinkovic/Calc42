import { useMemo, useState } from 'react'
import { c, closeTo, format, type Complex } from '../lib/complex'
import { buttonMap, run, type CalculatorDef } from '../lib/machine'
import type { Example } from '../examples/types'
import { FormulaView } from './FormulaView'

const TAPE_LIMIT = 120
const TAPE_EDGE = 40

interface Props {
  calc: CalculatorDef
  tokens: string[]
  setTokens: (t: string[]) => void
  xText: string
  setXText: (s: string) => void
  loaded: Example | null
}

export function parseX(s: string): Complex {
  const v = Number(s.trim().replace('−', '-'))
  return c(s.trim() === '' ? NaN : v)
}

export function Calculator({ calc, tokens, setTokens, xText, setXText, loaded }: Props) {
  // null means "follow the end of the program".
  const [step, setStep] = useState<number | null>(null)
  const [showTape, setShowTape] = useState(false)
  const [showFormula, setShowFormula] = useState(false)

  const x = parseX(xText)
  const result = useMemo(() => run(tokens, calc, x), [tokens, calc, x.re])
  const labels = useMemo(() => buttonMap(calc), [calc])

  const lastStep = result.snapshots.length - 1
  const at = step === null ? lastStep : Math.min(step, lastStep)
  const stack = result.snapshots[at]
  const shownTokens = useMemo(() => tokens.slice(0, at), [tokens, at])
  const endDepth = result.snapshots[lastStep].length

  const press = (token: string) => {
    setTokens([...tokens, token])
    setStep(null)
  }

  const isLoaded = loaded !== null && loaded.tokens === tokens
  const expected = isLoaded ? loaded.expected(x) : null
  const top = stack.length === 1 ? stack[0] : null

  const tapeIdx = tokens.map((_, k) => k)
  const collapsed = !showTape && tokens.length > TAPE_LIMIT
  const visible = collapsed ? [...tapeIdx.slice(0, TAPE_EDGE), -1, ...tapeIdx.slice(-TAPE_EDGE)] : tapeIdx

  return (
    <section className="calc">
      <div className="display" aria-live="polite">
        <div className="display-label">
          {at < lastStep ? `Step ${at} of ${lastStep}` : 'Result'}
        </div>
        <div className="display-value">
          {top ? format(top) : stack.length === 0 ? '—' : `${stack.length} values on the stack`}
        </div>
        {expected && at === lastStep && (
          <div className={`display-check ${top && closeTo(top, expected) ? 'ok' : 'bad'}`}>
            Expected {format(expected)} {top && closeTo(top, expected) ? '✓' : '✗'}
          </div>
        )}
      </div>

      {calc.hasX && (
        <label className="xinput">
          <span>x =</span>
          <input
            inputMode="decimal"
            value={xText}
            onChange={(e) => setXText(e.target.value)}
            aria-invalid={Number.isNaN(x.re)}
          />
          {Number.isNaN(x.re) && <span className="err">Enter a number</span>}
        </label>
      )}

      <div className={`keypad k${calc.buttons.length}`}>
        {calc.buttons.map((b) => (
          <button
            key={b.token}
            className="key"
            title={b.title}
            disabled={endDepth < b.arity || !!result.error}
            onClick={() => press(b.token)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="controls">
        <button onClick={() => { setTokens(tokens.slice(0, -1)); setStep(null) }} disabled={tokens.length === 0}>
          Undo
        </button>
        <button onClick={() => { setTokens([]); setStep(null) }} disabled={tokens.length === 0}>
          Clear
        </button>
        <button className={showFormula ? 'on' : ''} onClick={() => setShowFormula(!showFormula)} aria-pressed={showFormula}>
          {showFormula ? 'Hide formula' : 'Show formula'}
        </button>
      </div>

      {showFormula && (
        <div className="panel">
          <h3>Formula</h3>
          <FormulaView tokens={shownTokens} calc={calc} />
        </div>
      )}

      <div className="panel">
        <h3>
          Program <span className="muted">K = {tokens.length}</span>
        </h3>
        {tokens.length === 0 ? (
          <p className="muted">Empty. Press the buttons above or load an example below.</p>
        ) : (
          <div className="tape">
            {visible.map((k, n) =>
              k === -1 ? (
                <button key={`gap${n}`} className="chip gap" onClick={() => setShowTape(true)}>
                  … {tokens.length - 2 * TAPE_EDGE} more
                </button>
              ) : (
                <button
                  key={k}
                  className={`chip${k < at ? '' : ' future'}${k === at - 1 ? ' cur' : ''}`}
                  title={`Step ${k + 1}`}
                  onClick={() => setStep(k + 1)}
                >
                  {labels.get(tokens[k])?.label ?? tokens[k]}
                </button>
              ),
            )}
          </div>
        )}
        {showTape && tokens.length > TAPE_LIMIT && (
          <button className="link" onClick={() => setShowTape(false)}>Collapse</button>
        )}
        {result.error && <p className="err">Step {result.error.at + 1}: {result.error.message}</p>}
        {tokens.length > 0 && (
          <label className="stepper">
            <span>Step through</span>
            <input
              type="range"
              min={0}
              max={lastStep}
              value={at}
              onChange={(e) => {
                const v = Number(e.target.value)
                setStep(v === lastStep ? null : v)
              }}
            />
          </label>
        )}
      </div>

      <div className="panel">
        <h3>Stack <span className="muted">top first</span></h3>
        {stack.length === 0 ? (
          <p className="muted">Empty</p>
        ) : (
          <ol className="stack">
            {[...stack].reverse().map((v, k) => (
              <li key={k} className={k === 0 ? 'top' : ''}>{format(v)}</li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
