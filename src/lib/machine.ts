import type { Complex } from './complex'

export interface Button {
  token: string
  label: string
  arity: 0 | 1 | 2
  title: string
  // Arity 0 buttons receive the x input, operators receive their operands in push order.
  fn: (args: Complex[], x: Complex) => Complex
}

export interface CalculatorDef {
  id: string
  name: string
  buttons: Button[]
  hasX: boolean
  // How a node looks in the nested formula view.
  render: Record<string, { prefix: string; infix?: string }>
}

export interface RunResult {
  // snapshots[k] is the stack after the first k tokens.
  snapshots: Complex[][]
  error?: { at: number; message: string }
}

export function buttonMap(calc: CalculatorDef): Map<string, Button> {
  return new Map(calc.buttons.map((b) => [b.token, b]))
}

export function run(tokens: readonly string[], calc: CalculatorDef, x: Complex): RunResult {
  const buttons = buttonMap(calc)
  const stack: Complex[] = []
  const snapshots: Complex[][] = [[]]
  for (let k = 0; k < tokens.length; k++) {
    const b = buttons.get(tokens[k])
    if (!b) return { snapshots, error: { at: k, message: `Unknown button "${tokens[k]}"` } }
    if (stack.length < b.arity) {
      return { snapshots, error: { at: k, message: `"${b.label}" needs ${b.arity} values on the stack` } }
    }
    const args = stack.splice(stack.length - b.arity, b.arity)
    stack.push(b.fn(args, x))
    snapshots.push(stack.slice())
  }
  return { snapshots }
}

export function finalValue(tokens: readonly string[], calc: CalculatorDef, x: Complex): Complex | undefined {
  const r = run(tokens, calc, x)
  const last = r.snapshots[r.snapshots.length - 1]
  return r.error || last.length !== 1 ? undefined : last[0]
}

// Stack depth after each token, used to enable or disable keypad buttons without evaluating.
export function stackDepth(tokens: readonly string[], calc: CalculatorDef): number {
  const buttons = buttonMap(calc)
  let d = 0
  for (const t of tokens) {
    const b = buttons.get(t)
    if (!b) return -1
    d = d - b.arity + 1
  }
  return d
}
