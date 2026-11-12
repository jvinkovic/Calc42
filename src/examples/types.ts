import type { Complex } from '../lib/complex'

export interface Example {
  name: string
  formula: string
  tokens: string[]
  expected: (x: Complex) => Complex
  // Suggested x for the 4-button calculator.
  x?: number
  note?: string
}
