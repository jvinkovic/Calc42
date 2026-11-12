# Calc42

Two tiny calculators that can still compute everything a scientific calculator can. They run entirely in the browser.

The idea comes from A. Odrzywołek's paper [All elementary functions from a single operator](https://arxiv.org/abs/2603.21852) (arXiv 2603.21852). It shows that one binary operator together with the digit 1 is enough to build every standard elementary function:

```text
eml(x, y) = exp(x) − ln(y)
```

## The calculators

| Page | Buttons | What it is |
| --- | --- | --- |
| 4 buttons (`#/four`) | `x` `exp` `ln` `−` | "Calc 2" from Table 2 of the paper. It has no constants. Zero is `x x −` and one is `exp(0)`. |
| 2 buttons (`#/two`) | `1` `EML` | The Sheffer-style operator from the paper. It makes constants such as 0, −1, i, π and e. |

Both work as RPN stack machines, the same model as the paper's "single instruction stack machine". A program is the sequence of buttons you press. For example `1 1 EML` gives e, and the paper's `ln` is `1 1 x E 1 E E`.

Values are complex numbers on the principal branch, so `ln(−1) = iπ`. The machine also follows the paper's convention that `ln 0 = −∞` and `exp(−∞) = 0`, which the constructions for negation rely on.

## Features

- Live result, a visible stack, and the program tape with its length K.
- A step slider to replay a program press by press.
- **Show formula** turns the RPN program into nested brackets. The brackets cycle `( )` `[ ]` `{ }` with depth and change colour every three levels. Hovering or tapping a bracket highlights its pair.
- 25 examples on each page, including sin, cos, sinh, sigmoid, √2, π, i, iⁱ and the golden ratio. **Load** puts an example on the calculator and checks the result against the expected value. **Show steps** lists every button press and the value you should see after it.

## Limits

The paper covers elementary functions only. Functions such as `erf` or the gamma function are not elementary, so no finite program on either calculator produces them exactly.

## Author

Made by [Josip Vinković](https://www.linkedin.com/in/josipvinkovic/) @ [Nedotal](https://nedotal.hr).

## License

[MIT](LICENSE)
