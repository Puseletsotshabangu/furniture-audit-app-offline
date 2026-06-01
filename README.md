# Furniture Audit App

A small offline-capable React app for validating school furniture data.

## Files included

- `index.html` — main HTML entry point
- `style.css` — app styling
- `app.js` — React application code
- `validate_emis_import.js` — EMIS import validation helper
- `schools.csv` — sample data file
- `vendor/` — local React, ReactDOM, and Babel bundles for offline use

## Run locally

### Option 1: Open directly
1. Copy the entire folder to the device or tablet.
2. Open `index.html` in the browser.

> If the browser blocks local script access, use a simple local server instead.

### Option 2: Run a local server
From the project folder, run a local server such as:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Offline behavior

The app loads React and Babel from the local `vendor/` folder. No internet connection is required once the files are copied.

## GitHub Pages deployment

This app can be hosted on GitHub Pages as a static site.

### Publish from the repository
1. Push the repository to GitHub.
2. In GitHub, go to `Settings` → `Pages`.
3. Choose the branch to publish from (for example `main`).
4. Use the root folder as the publishing source.

If the repo is published on GitHub Pages, the app will load from the same relative file paths used in `index.html`.

### Optional docs/ folder

To keep GitHub Pages content cleaner, you can publish from `docs/` instead of the repository root.

- Copy `index.html`, `style.css`, `app.js`, `validate_emis_import.js`, `schools.csv`, and `vendor/` into `docs/`
- Set GitHub Pages source to `docs/`
- Add an empty `.nojekyll` file to `docs/` if needed

If you want automatic deployment, use the GitHub Actions workflow in `.github/workflows/gh-pages.yml` to publish `docs/` to the `gh-pages` branch.

If you prefer publishing from the repository root instead of `docs/`, change `publish_dir: ./docs` to `publish_dir: ./` in `.github/workflows/gh-pages.yml` and use the repository root as the Pages source.

See `docs/README.md` for more details.

## Notes

- Keep the full folder structure together so `index.html` can find `vendor/`, `app.js`, and `style.css`.
- The app is designed for offline use, so it does not require external CDN resources.
