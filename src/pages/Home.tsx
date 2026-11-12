import { Link } from 'react-router'

export function Home() {
  return (
    <main className="page">
      <h1>A whole calculator from one operator</h1>
      <p>
        A. Odrzywołek's paper{' '}
        <a href="https://arxiv.org/abs/2603.21852" target="_blank" rel="noreferrer">
          "All elementary functions from a single operator"
        </a>{' '}
        shows that a scientific calculator with dozens of buttons can be cut down step by step without losing anything.
        The last step is a single binary operator,
      </p>
      <p className="big"><code>eml(x, y) = exp(x) − ln(y)</code></p>
      <p>
        together with the digit 1. Everything else (0, −1, i, π, addition, multiplication, square roots, sine) is just a
        longer program. Both calculators here are stack machines, so a program is the sequence of buttons you press.
      </p>
      <div className="choices">
        <Link to="/four" className="choice">
          <h2>4 buttons</h2>
          <p><code>x</code> <code>exp</code> <code>ln</code> <code>−</code></p>
          <p className="muted">No constants. Takes an input x.</p>
        </Link>
        <Link to="/two" className="choice">
          <h2>2 buttons</h2>
          <p><code>1</code> <code>EML</code></p>
          <p className="muted">One constant, one operator.</p>
        </Link>
      </div>
      <p className="muted">
        Not sure how to read a stack program? Press <b>Show formula</b> under any calculator to see it written as nested
        brackets. Bracket shapes cycle ( ) [ ] {'{ }'} with depth and change color every three levels.
      </p>
    </main>
  )
}
