# ParaCalc369

A free, MIT-licensed scientific, graphing, unit conversion, and installable calculator built with React + Vite and designed for GitHub Pages.

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
- Graph presets, zoom controls, reset range, and PNG export
- Unit converter mode for length, mass, temperature, time, data, speed, area, volume, and angle
- PWA install support with manifest, service worker, offline fallback, and update prompt
- Keyboard help overlay and global focus shortcuts
- History panel
- Keyboard support
- No unsafe JavaScript `eval`; expressions are parsed by the included calculator engine

## Keyboard shortcuts

- `/` focuses the main calculator input.
- `?` opens or closes the keyboard help panel.
- `Escape` closes help.
- `Enter` solves when calculator buttons are focused.
- Number and operator keys can be typed directly in calculator fields.

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

### v1.6 accessibility and keyboard mode

- Added keyboard shortcut help overlay.
- Added `/` shortcut to focus the main calculator input.
- Added `?` shortcut to open and close help.
- Added stronger focus styles and screen-reader utility CSS.
- Added an ARIA shortcut hint for the help button.

### v1.5 PWA install mode

- Added web app manifest.
- Added SVG app icons.
- Added service worker registration.
- Added offline fallback page.
- Added small install/update status toast.
- Added cache cleanup for newer app versions.

### v1.4 unit converter mode

- Added unit converter panel.
- Added conversion support for length, mass, temperature, time, data, speed, area, volume, and angle.
- Added swap, quick value buttons, and copy conversion.
- Added standalone converter engine and tests.

### v1.3 graph tools

- Added graph presets for common functions.
- Added zoom in, zoom out, and reset range controls.
- Added PNG export for generated graphs.
- Improved y-range selection so outliers are less likely to flatten useful graph detail.
- Increased graph sample count for smoother curves.

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
