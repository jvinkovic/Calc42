import { buttonMap, type CalculatorDef } from './machine'

export interface Node {
  token: string
  children: Node[]
}

// Replays the RPN program building nodes instead of values. Stops at the first invalid token.
export function toTrees(tokens: readonly string[], calc: CalculatorDef): Node[] {
  const buttons = buttonMap(calc)
  const stack: Node[] = []
  for (const t of tokens) {
    const b = buttons.get(t)
    if (!b || stack.length < b.arity) break
    stack.push({ token: t, children: stack.splice(stack.length - b.arity, b.arity) })
  }
  return stack
}

export const BRACKETS = [['(', ')'], ['[', ']'], ['{', '}']] as const
export const COLOR_COUNT = 6

export function bracketStyle(depth: number) {
  return {
    pair: BRACKETS[depth % BRACKETS.length],
    color: Math.floor(depth / BRACKETS.length) % COLOR_COUNT,
  }
}

export type Segment =
  | { kind: 'text'; text: string }
  | { kind: 'open' | 'close'; text: string; depth: number; group: number }

export interface Flat {
  segments: Segment[]
  // groups[g] = [index of open segment, index of close segment]
  groups: [number, number][]
}

// Flattens trees into text and bracket segments so the view can truncate and highlight cheaply.
export function flatten(root: Node, calc: CalculatorDef): Flat {
  const segments: Segment[] = []
  const groups: [number, number][] = []

  // bare: an infix node here needs no bracket of its own, at the root or as the
  // only argument of a function like exp(a − b) whose brackets already enclose it.
  const walk = (n: Node, depth: number, bare: boolean) => {
    const r = calc.render[n.token]
    if (n.children.length === 0) {
      segments.push({ kind: 'text', text: r.prefix })
      return
    }
    const bracketed = !(bare && r.prefix === '' && r.infix)
    if (r.prefix) segments.push({ kind: 'text', text: r.prefix })
    const g = groups.length
    const { pair } = bracketStyle(depth)
    if (bracketed) {
      groups.push([segments.length, -1])
      segments.push({ kind: 'open', text: pair[0], depth, group: g })
    }
    const inner = bracketed ? depth + 1 : depth
    n.children.forEach((ch, k) => {
      if (k > 0) segments.push({ kind: 'text', text: r.infix ?? ', ' })
      walk(ch, inner, n.children.length === 1 && r.prefix !== '')
    })
    if (bracketed) {
      groups[g][1] = segments.length
      segments.push({ kind: 'close', text: pair[1], depth, group: g })
    }
  }

  walk(root, 0, true)
  return { segments, groups }
}

export function flatText(f: Flat): string {
  return f.segments.map((s) => s.text).join('')
}
