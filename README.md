# ParaCalc369

A free, MIT-licensed scientific, graphing, unit conversion, installable, shareable, formula-reference, and history-aware calculator built with React + Vite and designed for GitHub Pages.

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
- Enter-to-solve from the main expression input
- Friendlier calculator error messages
- Graph mode for functions like `sin(x)`, `x^2`, and `log(x)`
- Graph presets, zoom controls, reset range, manual y-range, tick labels, captioned PNG export, Enter-to-plot, and graph-local RAD/DEG mode
- Unit converter mode for length, mass, temperature, time, data, speed, area, volume, and angle
- Shareable workspace URLs for calculator, graph, and unit converter state
- Formula Library mode with searchable geometry, algebra, trigonometry, statistics, physics, electricity, finance, unit helpers, tags, constants, copy cards, and insertable examples
- History Vault mode with favorites, JSON/CSV export, restore, copy, and clear tools
- Unified Tools Dock for share, formulas, history, and help
- PWA install support with manifest, service worker, offline fallback, and update prompt
- Keyboard help overlay and global focus shortcuts
- History panel
- Keyboard support
- No unsafe JavaScript `eval`; expressions are parsed by the included calculator engine

## Keyboard shortcuts

- `/` focuses the main calculator input.
- `?` opens or closes the keyboard help panel.
- `Escape` closes help.
- `Enter` solves from the main calculator input and plots from graph inputs.
- Number and operator keys can be typed directly in calculator fields.

## Project docs

- [Contributing](CONTRIBUTING.md)
- [Roadmap](ROADMAP.md)
- [Release checklist](RELEASE_CHECKLIST.md)
- [Support](SUPPORT.md)
- [Screenshots guide](docs/SCREENSHOTS.md)

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

### v2.4 Formula Library upgrades

- Added formula example insertion into the main calculator.
- Added expression insertion event bridge.
- Added Algebra, Trigonometry, Statistics, and Electricity sections.
- Added searchable tags to formula entries.
- Added tag chips to formula cards.
- Added Use Example actions beside Copy actions.
- Updated constant buttons to insert constants into the calculator.
- Added expanded Formula Library tests.
- Bumped service worker cache version.

### v2.3 Graph upgrades

- Added graph utility helpers and tests.
- Added graph-local RAD/DEG mode with RAD as the graph default.
- Added radians-first graph presets.
- Added manual y-min and y-max controls.
- Added Auto Y reset.
- Added tick labels on graph canvas.
- Increased graph samples for smoother plots.
- Added captioned PNG export with formula, ranges, and angle mode.
- Bumped service worker cache version.

### v2.2 calculator UX polish

- Added Enter-to-solve from the main expression input.
- Added Enter-to-plot for graph function and range inputs.
- Added friendlier UI error messages without changing the core parser.
- Added graph angle-mode guidance so users know whether trig plots use DEG or RAD.
- Improved mobile spacing around the Tools Dock and PWA status.
- Added friendly error message tests.
- Bumped service worker cache version.

### v2.1 repo polish

- Added contribution guide.
- Added roadmap.
- Added release checklist.
- Added screenshots guide.
- Added support guide.
- Added bug report issue template.
- Added feature request issue template.
- Added pull request template.
- Added README links to project docs.

### v2.0 Tools Dock polish

- Added unified Tools Dock.
- Moved Share, Clear URL, Formula Library, History Vault, and Help into one dock.
- Retired scattered floating tool buttons with CSS while keeping the working overlays intact.
- Added dock event bridge for opening existing overlays safely.
- Added Tools Dock event tests.
- Bumped service worker cache version.

### v1.9 History Vault mode

- Added History Vault overlay.
- Added favorite calculations stored locally.
- Added JSON history export and restore.
- Added CSV history export.
- Added copy tools for saved calculations.
- Added clear and reload tools.
- Added History Vault helper tests.
- Bumped service worker cache version.

### v1.8 Formula Library mode

- Added Formula Library data module.
- Added Formula Library overlay with search, constants, and copy-friendly formula cards.
- Added geometry, physics basics, finance, and unit-helper formulas.
- Added common constants like pi, Euler number, standard gravity, speed of light, and golden ratio.
- Added formula library tests.
- Bumped service worker cache version.

### v1.7 shareable state mode

- Added share-state URL helpers.
- Added floating Share/Clear URL panel.
- Share URLs preserve calculator expression, graph function/range, and unit converter settings.
- Shared URLs load calculator, graph, and unit defaults on open.
- Added share-state tests.
- Bumped service worker cache version.

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
