import { describe, expect, it } from 'vitest'
import { CALC2, EML } from '../lib/calculators'
import { c, closeTo, format } from '../lib/complex'
import { finalValue } from '../lib/machine'
import { fourExamples } from './fourExamples'
import { twoExamples } from './twoExamples'

describe('4-button examples', () => {
  it('has at least 20', () => expect(fourExamples.length).toBeGreaterThanOrEqual(20))

  for (const ex of fourExamples) {
    for (const xv of [ex.x ?? 2, 0.7, 2.5]) {
      it(`${ex.name} at x = ${xv}`, () => {
        const got = finalValue(ex.tokens, CALC2, c(xv))
        const want = ex.expected(c(xv))
        expect(got, `got ${got && format(got)} want ${format(want)}`).toBeDefined()
        expect(closeTo(got!, want), `got ${format(got!)} want ${format(want)}`).toBe(true)
      })
    }
  }
})

describe('2-button examples', () => {
  it('has at least 20', () => expect(twoExamples.length).toBeGreaterThanOrEqual(20))

  it('matches Table 4 lengths for 0 and e', () => {
    expect(twoExamples.find((e) => e.name === 'Zero')!.tokens).toHaveLength(7)
    expect(twoExamples.find((e) => e.name === "Euler's number")!.tokens).toHaveLength(3)
  })

  for (const ex of twoExamples) {
    it(ex.name, () => {
      const got = finalValue(ex.tokens, EML, c(0))
      const want = ex.expected(c(0))
      expect(got, `got undefined want ${format(want)}`).toBeDefined()
      expect(closeTo(got!, want), `got ${format(got!)} want ${format(want)} (K=${ex.tokens.length})`).toBe(true)
    })
  }
})
