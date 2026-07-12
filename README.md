# Tweety — Portfolio & Documentation

A premium, responsive, single-page portfolio website for **Tweety**, a real-time
social networking app built with **Flutter + Firebase**. Built as static
vanilla HTML/CSS/JS — no framework, no build step.

![Tweety](assets/og-image.jpg)

## Highlights
- ⚡ Self-contained, fast, lazy-loaded images
- 📱 Fully responsive (mobile → ultra-wide) with a mobile nav
- 🎬 Tasteful animations (scroll reveal, counters, hover, glass) — respects
  `prefers-reduced-motion`
- 🖼️ Filterable screenshots gallery with a keyboard lightbox (← → / Esc)
- 🔎 Full SEO: meta, Open Graph, Twitter cards, JSON-LD, `robots.txt`,
  `sitemap.xml`, web manifest, favicons
- 🎨 Brand palette extracted from the app's Flutter theme (Indigo `#3F51B5`)

## Sections
Hero · About · Why choose us · Features · Workflow · User types · Architecture ·
Tech stack · Security · Localization · Notifications · Analytics · Screenshots ·
Mobile app · FAQ · Pricing (placeholder) · Contact · Footer

## Documentation (`docs/`)
- `PRODUCT_OVERVIEW.md` · `FEATURES.md` · `TECH_STACK.md` · `ARCHITECTURE.md`
- `API_SUMMARY.md` · `USER_ROLES.md` · `SECURITY.md` · `FIREBASE.md`
- `SCREENSHOTS.md` · `DEPLOYMENT.md`

## Run locally
```bash
cd portfolio
python3 -m http.server 8080   # → http://localhost:8080
```

## Deploy
See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for **GitHub Pages, Netlify, Vercel
and Firebase Hosting**. Quick version:

- **GitHub Pages:** push `portfolio/` contents to a repo → Settings → Pages →
  `main` / root.
- **Netlify / Vercel:** no build command; publish directory `portfolio`.
- **Firebase Hosting:** `firebase init hosting` (public dir `portfolio`) →
  `firebase deploy`.

## Notes
- Replace the placeholder URL `https://example.github.io/tweety-portfolio/` in
  `index.html`, `sitemap.xml` and `robots.txt` with your final domain.
- The contact form is a front-end demo (no backend submission).
- Marketing copy is based only on real, source-verified features. Prepared-but-not
  -live capabilities (Firebase Messaging handlers, dark-mode activation, local SQL,
  Dio REST) are labelled as *prepared*.

---
Built from the Tweety app source. © 2026 Tweety.
