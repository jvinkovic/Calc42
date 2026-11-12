// Builds RPN programs (token arrays) for higher functions out of a calculator's primitives.
// Every derived function is written once against Prims, so both calculators share it.

export type Prog = string[]

export interface Prims {
  one: Prog
  zero: Prog
  x?: Prog
  exp(a: Prog): Prog
  ln(a: Prog): Prog
  sub(a: Prog, b: Prog): Prog
}

export class Lib {
  constructor(private p: Prims) {}

  get x(): Prog {
    if (!this.p.x) throw new Error('This calculator has no x button')
    return this.p.x
  }
  get one() { return this.p.one }
  get zero() { return this.p.zero }
  exp = (a: Prog) => this.p.exp(a)
  ln = (a: Prog) => this.p.ln(a)
  sub = (a: Prog, b: Prog) => this.p.sub(a, b)

  // 0 − a, needs ln(0) = −∞ on the EML machine.
  neg = (a: Prog) => this.sub(this.zero, a)
  add = (a: Prog, b: Prog) => this.sub(a, this.neg(b))
  mul = (a: Prog, b: Prog) => this.exp(this.add(this.ln(a), this.ln(b)))
  div = (a: Prog, b: Prog) => this.exp(this.sub(this.ln(a), this.ln(b)))
  recip = (a: Prog) => this.exp(this.neg(this.ln(a)))
  pow = (a: Prog, b: Prog) => this.exp(this.mul(b, this.ln(a)))
  half = (a: Prog) => this.div(a, this.two)
  sqrt = (a: Prog) => this.exp(this.half(this.ln(a)))

  get minusOne() { return this.neg(this.one) }
  get two() { return this.add(this.one, this.one) }
  get three() { return this.add(this.two, this.one) }
  get five() { return this.add(this.two, this.three) }
  get ten() { return this.mul(this.two, this.five) }
  get e() { return this.exp(this.one) }
  // ln(−1) = iπ on the principal branch.
  get iPi() { return this.ln(this.minusOne) }
  get i() { return this.exp(this.half(this.iPi)) }
  get pi() { return this.div(this.iPi, this.i) }
}

const calc2Zero: Prog = ['x', 'x', '-']

export const calc2Lib = new Lib({
  x: ['x'],
  zero: calc2Zero,
  one: [...calc2Zero, 'exp'],
  exp: (a) => [...a, 'exp'],
  ln: (a) => [...a, 'ln'],
  sub: (a, b) => [...a, ...b, '-'],
})

// Paper Eq. 5: ln z = eml(1, eml(eml(1, z), 1)), RPN "1 1 z E 1 E E".
const emlLn = (a: Prog): Prog => ['1', '1', ...a, 'E', '1', 'E', 'E']
const emlExp = (a: Prog): Prog => [...a, '1', 'E']

export const emlLib = new Lib({
  one: ['1'],
  zero: emlLn(['1']),
  exp: emlExp,
  ln: emlLn,
  // eml(ln a, exp b) = a − ln(exp b) = a − b when Im b lies in (−π, π].
  sub: (a, b) => [...emlLn(a), ...emlExp(b), 'E'],
})
