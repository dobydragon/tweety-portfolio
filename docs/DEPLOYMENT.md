# Tweety Portfolio — Deployment

The portfolio is a **static site** (vanilla HTML/CSS/JS, no build step). Deploy the
contents of the `portfolio/` folder to any static host.

## Structure
```
portfolio/
├── index.html
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── .nojekyll
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── brand/  screens/  icons/
│   └── og-image.jpg
└── docs/  (Markdown documentation)
```

## GitHub Pages
1. Create a public repo, e.g. `tweety-portfolio`.
2. Push the **contents of `portfolio/`** to the repo root (or a `docs/` folder).
3. Settings → Pages → Source: `main` branch, `/ (root)`.
4. Wait for the build; the site publishes at
   `https://<user>.github.io/tweety-portfolio/`.
5. `.nojekyll` is included so asset folders are served verbatim.

## Netlify
- Drag-and-drop the `portfolio/` folder onto Netlify, **or** connect the repo.
- Build command: *(none)*  ·  Publish directory: `portfolio` (or `.` if pushed to root).

## Vercel
- Import the repo. Framework preset: **Other**.
- Build command: *(none)*  ·  Output directory: `portfolio` (or root).

## Firebase Hosting
```bash
npm i -g firebase-tools
firebase login
firebase init hosting      # public dir: portfolio ; single-page app: No
firebase deploy --only hosting
```

## Local preview
```bash
cd portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

## Notes
- Update the canonical URL, `og:url`, sitemap and robots `Sitemap:` line to your
  final domain (currently placeholder `https://example.github.io/tweety-portfolio/`).
- All assets are relative, so the site also works from a sub-path.
