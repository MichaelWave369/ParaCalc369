# ParaCalc369

A free, MIT-licensed scientific calculator built with React + Vite and designed for GitHub Pages.

Live app target after Pages deploy: `https://MichaelWave369.github.io/ParaCalc369/`.

## Features

- Basic arithmetic: `+`, `-`, `×`, `÷`
- Scientific functions: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `sqrt`, `ln`, `log`, `exp`, `abs`, factorial
- Constants: `π`, `e`, previous answer `Ans`
- Parentheses, exponentiation, percent, modulo, implicit multiplication
- Degrees/radians toggle
- Memory buttons: `MC`, `MR`, `M+`, `M-`
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

## License

MIT. Use it, fork it, improve it, teach with it.
