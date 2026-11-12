import { describe, expect, it } from 'vitest'
import { CALC2, EML } from './calculators'
import { c, closeTo } from './complex'
import { finalValue, run, stackDepth } from './machine'

describe('machine', () => {
  it('computes e with 1 1 EML', () => {
    expect(closeTo(finalValue(['1', '1', 'E'], EML, c(0))!, c(Math.E))).toBe(true)
  })

  it("runs the paper's ln program 1 1 x E 1 E E", () => {
    // EML has no x button, so x is replaced by e = 1 1 E, giving ln(e) = 1.
    const v = finalValue(['1', '1', '1', '1', 'E', 'E', '1', 'E', 'E'], EML, c(0))!
    expect(closeTo(v, c(1))).toBe(true)
  })

  it('computes x − x = 0 on Calc 2', () => {
    expect(finalValue(['x', 'x', '-'], CALC2, c(5))).toEqual(c(0))
  })

  it('reports an arity error', () => {
    const r = run(['1', 'E'], EML, c(0))
    expect(r.error?.at).toBe(1)
    expect(r.snapshots).toHaveLength(2)
  })

  it('tracks stack depth', () => {
    expect(stackDepth(['x', 'x'], CALC2)).toBe(2)
    expect(stackDepth(['x', 'x', '-', 'exp'], CALC2)).toBe(1)
  })
})
