import { describe, expect, it } from 'vitest'
import { c, closeTo, exp, format, log } from './complex'

describe('complex', () => {
  it('log(0) is −∞ and exp(−∞) is 0', () => {
    expect(log(c(0))).toEqual(c(-Infinity))
    expect(exp(c(-Infinity))).toEqual(c(0))
  })

  it('uses the principal branch for negative reals', () => {
    expect(closeTo(log(c(-1)), c(0, Math.PI))).toBe(true)
    expect(closeTo(log(c(-1, -0)), c(0, Math.PI))).toBe(true)
  })

  it('handles infinities through ln and exp', () => {
    expect(log(c(Infinity))).toEqual(c(Infinity))
    expect(exp(c(Infinity))).toEqual(c(Infinity))
  })

  it('formats values', () => {
    expect(format(c(2))).toBe('2')
    expect(format(c(-1.5))).toBe('−1.5')
    expect(format(c(0, 1))).toBe('i')
    expect(format(c(0, -2))).toBe('−2i')
    expect(format(c(1, -2))).toBe('1 − 2i')
    expect(format(c(3, 1e-17))).toBe('3')
    expect(format(c(-Infinity))).toBe('−∞')
    expect(format(c(NaN))).toBe('undefined')
  })
})
