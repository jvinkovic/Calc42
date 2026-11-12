import { c, exp, log, sub } from './complex'
import type { CalculatorDef } from './machine'

// Table 2 "Calc 2": exp, ln and binary subtraction, plus the input variable x. No constants.
export const CALC2: CalculatorDef = {
  id: 'calc2',
  name: '4-button calculator',
  hasX: true,
  buttons: [
    { token: 'x', label: 'x', arity: 0, title: 'Push the input x', fn: (_, x) => x },
    { token: 'exp', label: 'exp', arity: 1, title: 'Replace top a with exp(a)', fn: ([a]) => exp(a) },
    { token: 'ln', label: 'ln', arity: 1, title: 'Replace top a with ln(a)', fn: ([a]) => log(a) },
    { token: '-', label: '−', arity: 2, title: 'Pop b, pop a, push a − b', fn: ([a, b]) => sub(a, b) },
  ],
  render: {
    x: { prefix: 'x' },
    exp: { prefix: 'exp' },
    ln: { prefix: 'ln' },
    '-': { prefix: '', infix: ' − ' },
  },
}

// The two-button Sheffer machine: eml(a, b) = exp(a) − ln(b) and the digit 1.
export const EML: CalculatorDef = {
  id: 'eml',
  name: '2-button calculator',
  hasX: false,
  buttons: [
    { token: '1', label: '1', arity: 0, title: 'Push 1', fn: () => c(1) },
    { token: 'E', label: 'EML', arity: 2, title: 'Pop b, pop a, push exp(a) − ln(b)', fn: ([a, b]) => sub(exp(a), log(b)) },
  ],
  render: {
    '1': { prefix: '1' },
    E: { prefix: 'eml', infix: ', ' },
  },
}
