import { add, c, div, exp, log, mul, pow, sub, type Complex } from '../lib/complex'
import { calc2Lib as L } from '../lib/compiler'
import type { Example } from './types'

const I = c(0, 1)
const two = c(2)
const cosC = (x: Complex) => div(add(exp(mul(I, x)), exp(mul(c(0, -1), x))), two)
const sinC = (x: Complex) => div(sub(exp(mul(I, x)), exp(mul(c(0, -1), x))), c(0, 2))

const ix = L.mul(L.i, L.x)
const eix = L.exp(ix)
const emix = L.exp(L.neg(ix))

export const fourExamples: Example[] = [
  { name: 'Zero', formula: 'x − x', tokens: L.zero, expected: () => c(0), x: 3, note: 'The calculator has no constants, so 0 is made from x.' },
  { name: 'One', formula: 'exp(x − x)', tokens: L.one, expected: () => c(1), x: 3 },
  { name: 'Minus one', formula: '0 − 1', tokens: L.minusOne, expected: () => c(-1), x: 3 },
  { name: "Euler's number", formula: 'e = exp(1)', tokens: L.e, expected: () => c(Math.E), x: 3 },
  { name: 'Negation', formula: '−x = 0 − x', tokens: L.neg(L.x), expected: (x) => sub(c(0), x), x: 7 },
  { name: 'Add one', formula: 'x + 1 = x − (0 − 1)', tokens: L.add(L.x, L.one), expected: (x) => add(x, c(1)), x: 41 },
  { name: 'Subtract one', formula: 'x − 1', tokens: L.sub(L.x, L.one), expected: (x) => sub(x, c(1)), x: 10 },
  { name: 'Double', formula: '2x = x + x', tokens: L.add(L.x, L.x), expected: (x) => mul(two, x), x: 21 },
  { name: 'Half', formula: 'x / 2 = exp(ln x − ln 2)', tokens: L.half(L.x), expected: (x) => div(x, two), x: 9 },
  { name: 'Reciprocal', formula: '1/x = exp(−ln x)', tokens: L.recip(L.x), expected: (x) => div(c(1), x), x: 4 },
  { name: 'Square', formula: 'x² = exp(ln x + ln x)', tokens: L.mul(L.x, L.x), expected: (x) => mul(x, x), x: 12 },
  { name: 'Cube', formula: 'x³ = x² · x', tokens: L.mul(L.mul(L.x, L.x), L.x), expected: (x) => mul(mul(x, x), x), x: 3 },
  { name: 'Square root', formula: '√x = exp(ln x / 2)', tokens: L.sqrt(L.x), expected: (x) => pow(x, c(0.5)), x: 2 },
  { name: 'Self power', formula: 'xˣ = exp(x · ln x)', tokens: L.pow(L.x, L.x), expected: (x) => pow(x, x), x: 3 },
  { name: 'Exponential', formula: 'eˣ', tokens: L.exp(L.x), expected: (x) => exp(x), x: 1 },
  { name: 'Natural log', formula: 'ln x', tokens: L.ln(L.x), expected: (x) => log(x), x: 10 },
  { name: 'Double exponential', formula: 'exp(eˣ)', tokens: L.exp(L.exp(L.x)), expected: (x) => exp(exp(x)), x: 1 },
  { name: 'Hyperbolic sine', formula: 'sinh x = (eˣ − e⁻ˣ) / 2', tokens: L.half(L.sub(L.exp(L.x), L.exp(L.neg(L.x)))), expected: (x) => div(sub(exp(x), exp(sub(c(0), x))), two), x: 1 },
  { name: 'Hyperbolic cosine', formula: 'cosh x = (eˣ + e⁻ˣ) / 2', tokens: L.half(L.add(L.exp(L.x), L.exp(L.neg(L.x)))), expected: (x) => div(add(exp(x), exp(sub(c(0), x))), two), x: 1 },
  { name: 'Logistic sigmoid', formula: 'σ(x) = 1 / (1 + e⁻ˣ)', tokens: L.recip(L.add(L.one, L.exp(L.neg(L.x)))), expected: (x) => div(c(1), add(c(1), exp(sub(c(0), x)))), x: 0.5 },
  { name: 'Imaginary unit', formula: 'i = exp(ln(−1) / 2)', tokens: L.i, expected: () => I, x: 3, note: 'ln(−1) = iπ on the principal branch.' },
  { name: 'Pi', formula: 'π = ln(−1) / i', tokens: L.pi, expected: () => c(Math.PI), x: 3 },
  { name: 'Cosine', formula: 'cos x = (eⁱˣ + e⁻ⁱˣ) / 2', tokens: L.half(L.add(eix, emix)), expected: cosC, x: 1 },
  { name: 'Sine', formula: 'sin x = (eⁱˣ − e⁻ⁱˣ) / 2i', tokens: L.div(L.sub(eix, emix), L.mul(L.two, L.i)), expected: sinC, x: 1 },
  { name: 'Golden ratio', formula: 'φ = (1 + √5) / 2', tokens: L.half(L.add(L.one, L.sqrt(L.five))), expected: () => c((1 + Math.sqrt(5)) / 2), x: 3 },
]
