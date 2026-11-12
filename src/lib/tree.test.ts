import { describe, expect, it } from 'vitest'
import { CALC2, EML } from './calculators'
import { bracketStyle, flatText, flatten, toTrees } from './tree'

describe('tree', () => {
  it("renders the paper's ln shape with cycling brackets", () => {
    const [t] = toTrees(['1', '1', '1', 'E', '1', 'E', 'E'], EML)
    expect(flatText(flatten(t, EML))).toBe('eml(1, eml[eml{1, 1}, 1])')
  })

  it('drops the root bracket of a bare subtraction', () => {
    const [t] = toTrees(['x', 'x', '-', 'exp', 'x', '-'], CALC2)
    expect(flatText(flatten(t, CALC2))).toBe('exp(x − x) − x')
  })

  it('cycles bracket type first, then color', () => {
    expect(bracketStyle(0)).toEqual({ pair: ['(', ')'], color: 0 })
    expect(bracketStyle(2)).toEqual({ pair: ['{', '}'], color: 0 })
    expect(bracketStyle(3)).toEqual({ pair: ['(', ')'], color: 1 })
    expect(bracketStyle(19).color).toBe(0)
  })

  it('returns one tree per stack value', () => {
    expect(toTrees(['1', '1', '1', 'E'], EML)).toHaveLength(2)
  })
})
