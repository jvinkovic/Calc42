import { EML } from '../lib/calculators'
import { twoExamples } from '../examples/twoExamples'
import { CalcPage } from './CalcPage'

export function TwoButton() {
  return (
    <CalcPage
      calc={EML}
      examples={twoExamples}
      title="2-button calculator"
      intro={
        <>
          <p>
            Buttons: <b>1</b> and <b>EML</b>, where <code>eml(a, b) = exp(a) − ln(b)</code>. The paper shows these two
            are enough to build every constant and function of a scientific calculator.
          </p>
          <p className="muted">
            <b>1</b> pushes a one. <b>EML</b> takes the top two values <i>a</i>, <i>b</i> and pushes{' '}
            <i>exp(a) − ln(b)</i>. Try <code>1 1 EML</code> to get e. Inside, ln 0 = −∞ and exp(−∞) = 0 are used, and
            values are complex on the principal branch.
          </p>
        </>
      }
    />
  )
}
