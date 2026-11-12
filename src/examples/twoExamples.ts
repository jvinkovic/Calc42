import { c, exp, pow } from '../lib/complex'
import { emlLib as L } from '../lib/compiler'
import type { Example } from './types'

const E = Math.E
const PI = Math.PI

export const twoExamples: Example[] = [
  { name: 'One', formula: '1', tokens: L.one, expected: () => c(1) },
  { name: "Euler's number", formula: 'e = eml(1, 1)', tokens: L.e, expected: () => c(E), note: 'The first thing the 1 and EML buttons make.' },
  { name: 'Zero', formula: '0 = ln 1', tokens: L.zero, expected: () => c(0) },
  { name: 'e to the e', formula: 'eᵉ', tokens: L.exp(L.e), expected: () => c(E ** E) },
  { name: 'e minus one', formula: 'e − 1', tokens: L.sub(L.e, L.one), expected: () => c(E - 1) },
  { name: 'Minus one', formula: '−1 = 0 − 1', tokens: L.minusOne, expected: () => c(-1), note: 'Uses ln 0 = −∞ and exp(−∞) = 0 inside.' },
  { name: 'Two', formula: '2 = 1 + 1', tokens: L.two, expected: () => c(2) },
  { name: 'Three', formula: '3 = 2 + 1', tokens: L.three, expected: () => c(3) },
  { name: 'Minus two', formula: '−2', tokens: L.neg(L.two), expected: () => c(-2) },
  { name: 'One half', formula: '1/2', tokens: L.half(L.one), expected: () => c(0.5) },
  { name: 'One over e', formula: '1/e = exp(−1)', tokens: L.exp(L.minusOne), expected: () => c(1 / E) },
  { name: 'e squared', formula: 'e² = exp(2)', tokens: L.exp(L.two), expected: () => c(E * E) },
  { name: 'Square root of e', formula: '√e = exp(1/2)', tokens: L.exp(L.half(L.one)), expected: () => c(Math.sqrt(E)) },
  { name: 'ln 2', formula: 'ln 2', tokens: L.ln(L.two), expected: () => c(Math.LN2) },
  { name: 'Square root of 2', formula: '√2', tokens: L.sqrt(L.two), expected: () => c(Math.SQRT2) },
  { name: 'Ten', formula: '10 = 2 · 5', tokens: L.ten, expected: () => c(10) },
  { name: 'Imaginary unit', formula: 'i = exp(ln(−1) / 2)', tokens: L.i, expected: () => c(0, 1), note: 'ln(−1) = iπ on the principal branch.' },
  { name: 'Minus i', formula: '−i', tokens: L.neg(L.i), expected: () => c(0, -1) },
  { name: 'Pi', formula: 'π = ln(−1) / i', tokens: L.pi, expected: () => c(PI) },
  { name: 'Pi squared', formula: 'π²', tokens: L.mul(L.pi, L.pi), expected: () => c(PI * PI) },
  { name: "Gelfond's constant", formula: 'e^π', tokens: L.exp(L.pi), expected: () => c(Math.exp(PI)) },
  { name: "Euler's identity", formula: 'exp(iπ) = −1', tokens: L.exp(L.iPi), expected: () => c(-1) },
  { name: 'i to the i', formula: 'iⁱ = e^(−π/2)', tokens: L.pow(L.i, L.i), expected: () => pow(c(0, 1), c(0, 1)) },
  { name: 'Golden ratio', formula: 'φ = (1 + √5) / 2', tokens: L.half(L.add(L.one, L.sqrt(L.five))), expected: () => c((1 + Math.sqrt(5)) / 2) },
  { name: 'e to the i', formula: 'eⁱ = cos 1 + i sin 1', tokens: L.exp(L.i), expected: () => exp(c(0, 1)) },
]
