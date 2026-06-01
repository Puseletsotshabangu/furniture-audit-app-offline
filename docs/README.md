# GitHub Pages docs folder

This repository is primarily built as a static offline app from the repository root.

## Optional clean GitHub Pages setup

If you want a cleaner GitHub Pages source, you can publish from a `docs/` folder instead of the repository root.

### What to do

1. Copy these files into `docs/`:
   - `index.html`
   - `style.css`
   - `app.js`
   - `validate_emis_import.js`
   - `schools.csv`
   - `vendor/`

2. In GitHub Pages settings, choose `docs/` as the publishing source.

3. If the site does not render correctly, add an empty `.nojekyll` file to `docs/`.

## Notes

- Publishing from `docs/` keeps the app files separate from repository root metadata and documentation.
- If you prefer, you can also publish directly from the root branch, which works with the current file structure.
