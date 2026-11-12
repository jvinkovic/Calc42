import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { App } from '../App'
import { StepsList } from '../components/StepsList'
import { FormulaView } from '../components/FormulaView'
import { EML, CALC2 } from '../lib/calculators'
import { twoExamples } from '../examples/twoExamples'
import { fourExamples } from '../examples/fourExamples'

const render = (path: string) =>
  renderToString(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

describe('pages', () => {
  it('renders home', () => expect(render('/')).toContain('eml(x, y)'))
  it('renders 4-button page with all examples', () => {
    const html = render('/four')
    expect(html).toContain('4-button calculator')
    expect(html.match(/<article/g)).toHaveLength(fourExamples.length)
  })
  it('renders 2-button page with all examples', () => {
    const html = render('/two')
    expect(html).toContain('2-button calculator')
    expect(html.match(/<article/g)).toHaveLength(twoExamples.length)
  })
  it('renders steps for an example', () => {
    const ex = fourExamples.find((e) => e.name === 'Square')!
    const html = renderToString(<StepsList calc={CALC2} ex={ex} />)
    expect(html).toContain('First type')
    expect(html.match(/<li/g)!.length).toBe(Math.min(60, ex.tokens.length))
  })
  it('renders a colored nested formula for a long program', () => {
    const pi = twoExamples.find((e) => e.name === 'Pi')!
    const html = renderToString(<FormulaView tokens={pi.tokens} calc={EML} />)
    expect(html).toContain('br c1')
  })
})
