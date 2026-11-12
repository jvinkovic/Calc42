import { CALC2 } from '../lib/calculators'
import { fourExamples } from '../examples/fourExamples'
import { CalcPage } from './CalcPage'

export function FourButton() {
  return (
    <CalcPage
      calc={CALC2}
      examples={fourExamples}
      title="4-button calculator"
      intro={
        <>
          <p>
            Buttons: <b>x</b>, <b>exp</b>, <b>ln</b> and <b>−</b> (the paper's "Calc 2"). There are no constants at all.
            Zero is <code>x x −</code> and one is <code>exp(0)</code>. Everything else follows.
          </p>
          <p className="muted">
            It works like an RPN calculator. <b>x</b> pushes your input onto the stack, <b>exp</b> and <b>ln</b> replace
            the top value, and <b>−</b> takes the top two values <i>a</i>, <i>b</i> and pushes <i>a − b</i>. Values are
            complex numbers on the principal branch, so ln(−1) = iπ.
          </p>
        </>
      }
    />
  )
}
