# ParaCalc369 Release Checklist

Use this before tagging or announcing a release.

## Code checks

- [ ] `npm test` passes.
- [ ] `npm run build` passes.
- [ ] GitHub Actions deploy is green.
- [ ] App loads on GitHub Pages.
- [ ] Hard refresh shows the latest version.

## App checks

- [ ] Basic calculator operations work.
- [ ] Scientific functions work.
- [ ] Graph mode plots a preset.
- [ ] Unit converter produces expected results.
- [ ] Formula Library opens from Tools Dock.
- [ ] History Vault opens from Tools Dock.
- [ ] Share URL copies and reloads expected state.
- [ ] PWA/offline behavior is not obviously broken.
- [ ] Mobile layout remains usable.

## Documentation checks

- [ ] README changelog updated.
- [ ] Roadmap updated if direction changed.
- [ ] Screenshots updated if UI changed materially.
- [ ] Contribution notes still match the project.

## Release notes outline

```text
## What changed

## Tests run

## Known limitations

## Next planned work
```
