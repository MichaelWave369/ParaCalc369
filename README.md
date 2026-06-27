# ParaCalc369

A free, MIT-licensed scientific and graphing calculator built with React + Vite and designed for GitHub Pages.

Live app target after Pages deploy: `https://MichaelWave369.github.io/ParaCalc369/`.

## Features

- Basic arithmetic: `+`, `-`, `×`, `÷`
- Scientific functions: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `sqrt`, `ln`, `log`, `exp`, `abs`, factorial
- Constants: `π`, `e`, previous answer `Ans`
- Parentheses, exponentiation, percent, modulo, implicit multiplication
- Degrees/radians toggle
- Memory buttons: `MC`, `MR`, `M+`, `M-`
- Clean 5-column desktop keypad with familiar number-pad flow
- Responsive mobile layout
- Light/dark theme toggle
- Copy result button
- Graph mode for functions like `sin(x)`, `x^2`, and `log(x)`
- History panel
- Keyboard support
- No unsafe JavaScript `eval`; expressions are parsed by the included calculator engine

## Local development

```bash
npm install
npm run dev
```

## Run tests

```bash
npm test
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

1. In GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Push to `main`; the included workflow builds and deploys the app.

For a project page like:

```text
https://MichaelWave369.github.io/ParaCalc369/
```

the workflow sets:

```bash
VITE_BASE=/ParaCalc369/
```

If you rename the repository, update `VITE_BASE` in `.github/workflows/pages.yml`.
For a user/org page such as `USERNAME.github.io`, use `/` instead.

## Changelog

### v1.2 graph mode

- Added graph mode with a lightweight canvas renderer.
- Added `x` variable support to the parser/evaluator.
- Added graph tests for variable expressions.
- Kept graphing dependency-free: no charting library required.

### v1.1 polish pass

- Fixed keypad ordering so the number pad reads naturally.
- Added copy-result support.
- Added light/dark theme switching.
- Improved display hierarchy with expression, preview/status, and result areas.
- Refined responsive styling for smaller screens.

## License

MIT. Use it, fork it, improve it, teach with it.
