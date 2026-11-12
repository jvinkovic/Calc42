export interface Complex {
  re: number
  im: number
}

export const c = (re: number, im = 0): Complex => ({ re, im })

export const ZERO = c(0)

export function add(a: Complex, b: Complex): Complex {
  return c(a.re + b.re, a.im + b.im)
}

export function sub(a: Complex, b: Complex): Complex {
  return c(a.re - b.re, a.im - b.im)
}

export function mul(a: Complex, b: Complex): Complex {
  return c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re)
}

export function div(a: Complex, b: Complex): Complex {
  const d = b.re * b.re + b.im * b.im
  return c((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d)
}

// exp(-inf + i*t) is exactly 0. Computing it naively gives 0 * cos(t) which is fine,
// but an infinite imaginary part would give NaN, so the limit is returned directly.
export function exp(z: Complex): Complex {
  if (z.re === -Infinity) return c(0)
  const m = Math.exp(z.re)
  if (z.im === 0) return c(m)
  return c(m * Math.cos(z.im), m * Math.sin(z.im))
}

// Principal branch, Im in (-pi, pi]. log(0) = -inf, which the paper relies on for negation.
export function log(z: Complex): Complex {
  if (z.re === 0 && z.im === 0) return c(-Infinity)
  // -0 imaginary parts would flip atan2 to -pi on the negative real axis.
  const im = z.im === 0 ? 0 : z.im
  return c(Math.log(Math.hypot(z.re, im)), Math.atan2(im, z.re))
}

export function pow(a: Complex, b: Complex): Complex {
  return exp(mul(b, log(a)))
}

export function abs(z: Complex): number {
  return Math.hypot(z.re, z.im)
}

export function isFiniteC(z: Complex): boolean {
  return Number.isFinite(z.re) && Number.isFinite(z.im)
}

export function closeTo(a: Complex, b: Complex, rel = 1e-9): boolean {
  if (!isFiniteC(a) || !isFiniteC(b)) {
    return Object.is(a.re, b.re) && Object.is(a.im === 0 ? 0 : a.im, b.im === 0 ? 0 : b.im)
  }
  return abs(sub(a, b)) <= rel * Math.max(1, abs(b))
}

function fmtReal(v: number): string {
  if (Number.isNaN(v)) return 'undefined'
  if (v === Infinity) return '∞'
  if (v === -Infinity) return '−∞'
  const s = Math.abs(v) >= 1e12 || (v !== 0 && Math.abs(v) < 1e-6)
    ? v.toExponential(10).replace(/\.?0+e/, 'e')
    : String(Number(v.toPrecision(12)))
  return s.replace('-', '−')
}

export function format(z: Complex): string {
  if (Number.isNaN(z.re) || Number.isNaN(z.im)) return 'undefined'
  const scale = Math.max(1, Math.abs(z.re))
  const showIm = Number.isFinite(z.im) ? Math.abs(z.im) > 1e-12 * scale : true
  const showRe = !showIm || Math.abs(z.re) > 1e-12 * Math.max(1, Math.abs(z.im)) || !Number.isFinite(z.re)
  if (!showIm) return fmtReal(Math.abs(z.re) < 1e-15 ? 0 : z.re)
  const imAbs = Math.abs(z.im)
  const imStr = (imAbs === 1 ? '' : fmtReal(imAbs)) + 'i'
  if (!showRe) return (z.im < 0 ? '−' : '') + imStr
  return `${fmtReal(z.re)} ${z.im < 0 ? '−' : '+'} ${imStr}`
}
