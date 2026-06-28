# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Anthony Sadler's personal portfolio website, hosted on GitHub Pages. It is a **single-file static site** — all HTML, CSS, and JavaScript live in `index.html`. There is no build step, no bundler, and no framework. The `resume/Resume.html` file is a separate standalone HTML resume.

## Commands

```bash
# Install dependencies (test tooling only)
npm install

# Run unit tests (Vitest, jsdom)
npm run test:unit

# Run a single unit test file
npx vitest run tests/unit/theme-toggle.test.js

# Run E2E tests (Playwright — accessibility, responsive, performance)
npm run test:e2e

# Run all tests
npm test

# Serve locally for manual testing or E2E tests
npx serve . -p 3000
```

## Architecture

### Content Data Pattern

All portfolio content is defined as plain JavaScript constants at the top of the `<script>` block in `index.html` (~line 696). These constants (`workExperience`, `education`, `publications`, `projects`, `awards`, `certifications`, `skills`, `interests`, `bio1`, `bio2`) are then rendered into pre-existing DOM container elements via `innerHTML`/`textContent`. To add or edit content, update the relevant constant — no structural HTML changes needed.

### Theming

CSS custom properties (`--bg`, `--text`, `--accent`, etc.) drive both dark and light modes. Dark is the default; `.light-mode` on `<body>` overrides the variables. The selected theme is persisted in `localStorage`.

### 3D Background

Three.js (loaded from CDN) renders two wireframe polyhedra (icosahedron + octahedron) that bounce around the viewport in a DVD-style pattern. The canvas is fixed, z-index 0, pointer-events none — it sits behind all content.

### Tests

- **Unit** (`tests/unit/`, Vitest + jsdom): Test individual JS behaviors — typing animation, theme toggle, easter egg sequence, data rendering, bounds calculation.
- **E2E** (`tests/accessibility/`, `tests/responsive/`, `tests/performance/`, Playwright): Playwright spins up `npx serve . -p 3000` automatically. Tests run on Desktop Chrome and iPhone 13 profiles. Accessibility tests use `@axe-core/playwright`.
