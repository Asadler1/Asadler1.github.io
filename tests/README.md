# Portfolio Tests

Comprehensive test suite for the Asadler1.github.io portfolio website covering unit tests, accessibility, responsive design, and performance.

## Setup

```bash
npm install
npx playwright install  # Install browser binaries
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Unit Tests Only
```bash
npm run test:unit
```

### Run Unit Tests with Coverage
```bash
npm run test:unit -- --coverage
```

### Run E2E Tests Only
```bash
npm run test:e2e
```

### Run Specific Test Suite
```bash
npx vitest run tests/unit/typewriter.test.js
npx playwright test tests/accessibility/
```

## Test Structure

### Unit Tests (`tests/unit/`)
Tests for isolated JavaScript logic using Vitest + jsdom.

- **bounds.test.js** — Pure math: camera FOV to viewport bounds conversion
- **typewriter.test.js** — Character-by-character typing animation
- **theme-toggle.test.js** — Dark/light mode toggle with localStorage
- **easter-egg.test.js** — Key sequence detection (r-e-a-l)
- **data-rendering.test.js** — HTML rendering from data arrays (skills, certifications, awards, etc.)

### Accessibility Tests (`tests/accessibility/`)
Tests using Playwright + @axe-core/playwright.

- **axe.test.js** — Axe accessibility scans in dark and light mode, heading hierarchy, alt text, link descriptions, color contrast

### Responsive Tests (`tests/responsive/`)
Tests using Playwright across multiple viewports.

- **layout.test.js** — No horizontal overflow, hamburger menu visibility, nav link visibility, menu toggle behavior, font sizing, landscape orientation

### Performance Tests (`tests/performance/`)
Tests using Playwright + playwright-lighthouse.

- **lighthouse.test.js** — Lighthouse scoring (performance ≥80, accessibility ≥90, SEO ≥80), First Contentful Paint, image optimization, CSS efficiency, meta tags, console errors, render-blocking resources, Time to Interactive

## Key Test Coverage

| Feature | Test Type | File |
|---------|-----------|------|
| Typewriter animation | Unit | `typewriter.test.js` |
| Theme toggle | Unit | `theme-toggle.test.js` |
| Easter egg (r-e-a-l) | Unit | `easter-egg.test.js` |
| Skills/Interests rendering | Unit | `data-rendering.test.js` |
| Certifications with badge | Unit | `data-rendering.test.js` |
| Awards with image | Unit | `data-rendering.test.js` |
| Accessibility (WCAG) | E2E | `axe.test.js` |
| Mobile responsiveness | E2E | `layout.test.js` |
| Hamburger menu | E2E | `layout.test.js` |
| Performance metrics | E2E | `lighthouse.test.js` |

## Viewport Sizes Tested

- **Desktop**: 1280×720
- **Tablet**: 768×1024  
- **Mobile**: 390×844 (iPhone 13)
- **Mobile Landscape**: 844×390

## Notes

- Unit tests run in jsdom environment, avoiding need to refactor inline JS from index.html
- E2E tests require a local dev server (automatically started by Playwright)
- Some tests use `vi.useFakeTimers()` to control async operations
- Lighthouse thresholds are conservative (80+ performance, 90+ accessibility, 80+ SEO)
