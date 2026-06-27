# Contributing to ParaCalc369

Thanks for helping improve ParaCalc369. This project is meant to stay free, useful, understandable, and safe for students, builders, and curious humans.

## Local setup

```bash
npm install
npm run dev
```

## Before opening a pull request

Please run:

```bash
npm test
npm run build
```

## Project principles

- Keep the calculator dependency-light.
- Do not use unsafe JavaScript `eval` for expression solving.
- Add tests for parser, converter, share-state, formula, history, or utility changes.
- Keep UI changes responsive and keyboard-accessible.
- Prefer small focused pull requests.
- Keep formulas and educational references clear and claim-safe.

## Good first contribution areas

- Add formula library entries.
- Improve accessibility labels and focus flow.
- Add parser tests for edge cases.
- Improve graph labels or graph export behavior.
- Add additional unit converter categories.
- Improve documentation and screenshots.

## Pull request checklist

- [ ] I ran `npm test`.
- [ ] I ran `npm run build`.
- [ ] I updated docs if behavior changed.
- [ ] I added or updated tests when useful.
- [ ] I checked the app in a narrow/mobile viewport.

## Style notes

This app intentionally uses plain React, CSS, and small utility modules. New features should be easy to understand by reading the source.
