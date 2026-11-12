import { useState, type ReactNode } from 'react'
import { Calculator } from '../components/Calculator'
import { ExampleList } from '../components/ExampleList'
import type { CalculatorDef } from '../lib/machine'
import type { Example } from '../examples/types'

interface Props {
  calc: CalculatorDef
  examples: Example[]
  title: string
  intro: ReactNode
}

export function CalcPage({ calc, examples, title, intro }: Props) {
  const [tokens, setTokens] = useState<string[]>([])
  const [xText, setXText] = useState('2')
  const [loaded, setLoaded] = useState<Example | null>(null)

  const load = (ex: Example) => {
    setTokens(ex.tokens)
    if (calc.hasX && ex.x !== undefined) setXText(String(ex.x))
    setLoaded(ex)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="page">
      <h1>{title}</h1>
      <div className="intro">{intro}</div>
      <Calculator
        calc={calc}
        tokens={tokens}
        setTokens={setTokens}
        xText={xText}
        setXText={setXText}
        loaded={loaded}
      />
      <ExampleList calc={calc} examples={examples} onLoad={load} active={loaded?.tokens === tokens ? loaded : null} />
    </main>
  )
}
