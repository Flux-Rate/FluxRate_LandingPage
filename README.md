# FluxRate Marketing Site

Production-ready single-page marketing experience for **FluxRate** (Adaptive Cyber-Physical Pricing System). Built with Vite, React 18, TypeScript, and Tailwind CSS including motion, accessibility, and testing foundations.

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS with custom design tokens
- Framer Motion for section reveals
- React Router (hash linking)
- Vitest + Testing Library for smoke tests
- ESLint + Prettier

## Quick Start
```bash
npm install
npm run dev
```
The app runs at `http://localhost:5173`. Hash links use smooth scrolling with sticky-header offset.

## Available Scripts
- `npm run dev` – start local dev server
- `npm run build` – type-check and build production assets to `dist/`
- `npm run preview` – preview the production build locally
- `npm run test -- --run` – run Vitest suite once (jsdom)
- `npm run lint` – ESLint across `.ts` / `.tsx`
- `npm run format` – Prettier write mode

## Editing Content
All copy, stats, CTA labels, and messaging live in `src/content/siteContent.ts`. Numbers are kept as strings for easy editing. Update the file to change hero bullets, KPIs, customer quotes, facility options, etc.

## Assets
- Logo: `FluxRate_logo.jpg`
- Favicon & social preview: `public/favicon.ico`, `public/og-image.png`
  - Replace with brand assets as needed (1200×630 social preview recommended).

## Testing
Vitest smoke tests live in `src/tests`. They ensure key sections mount and nav links render. Extend with behaviour-specific tests as new interactions are introduced.

## Deployment

### Netlify
1. Push this repo to GitHub.
2. In Netlify, **New site → Import from Git**.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add optional redirect `_redirects` if you expect non-hash routes.

### GitHub Pages (auto-deploy)
1. Push the repository to GitHub with the default branch named `main`.
2. In GitHub, go to **Settings → Pages** and set the source to **GitHub Actions**.
3. The included workflow `.github/workflows/deploy.yml` will build on every push to `main` and publish the `dist/` folder to Pages.
4. First deploy can take a minute; the workflow output contains the live URL (`https://<user>.github.io/<repo>/`).

## Customisation Notes
- Tailwind tokens: adjust brand colours in `tailwind.config.ts` and `src/styles/globals.css`.
- KPI targets & future roadmap copy: update arrays in `siteContent.ts`.
- Contact form: currently stubbed; replace `console.log` in `ContactForm.tsx` with API integration.
- Analytics: modify `src/utils/analytics.ts` to wire into your platform (Segment, GA, etc.).

## Preview
`npm run preview` serves the production build locally for QA before deployment.
