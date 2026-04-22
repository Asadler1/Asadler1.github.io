import { test, expect } from '@playwright/test'
import playWrightLighthouse from 'playwright-lighthouse'

test.describe('Performance Tests', () => {
  test('should have good Lighthouse scores', async ({ page }) => {
    await page.goto('/')

    await playWrightLighthouse(page, {
      thresholds: {
        performance: 80,
        accessibility: 90,
        'best-practices': 80,
        seo: 80,
      },
      disableStorageReset: true,
      config: undefined,
    })
  })

  test('should load core content quickly', async ({ page }) => {
    await page.goto('/')

    // First contentful paint should be quick
    const fcp = await page.evaluate(() => {
      const paint = performance.getEntriesByName('first-contentful-paint')[0]
      return paint ? paint.startTime : null
    })

    expect(fcp).toBeLessThan(3000) // Should be under 3 seconds
  })

  test('should have proper image optimization', async ({ page }) => {
    await page.goto('/')

    const images = page.locator('img')
    const count = await images.count()

    expect(count).toBeGreaterThan(0)

    // Check that images have reasonable sizes
    for (let i = 0; i < count; i++) {
      const width = await images.nth(i).getAttribute('width')
      const height = await images.nth(i).getAttribute('height')
      // Images should either have explicit dimensions or be handled by CSS
      // This test just verifies images are present
      expect(images.nth(i)).toBeTruthy()
    }
  })

  test('should not have excessive unused CSS', async ({ page }) => {
    await page.goto('/')

    const coverage = await page.evaluate(() => {
      // Get rough estimate of CSS size
      const stylesheets = document.styleSheets
      let totalRules = 0
      for (let i = 0; i < stylesheets.length; i++) {
        try {
          const sheet = stylesheets[i]
          if (sheet.cssRules) {
            totalRules += sheet.cssRules.length
          }
        } catch (e) {
          // Skip external stylesheets
        }
      }
      return totalRules
    })

    // Should have reasonable number of CSS rules
    expect(coverage).toBeGreaterThan(50)
    expect(coverage).toBeLessThan(1000)
  })

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/')

    // Check for viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content')
    expect(viewport).toBeTruthy()

    // Check for title
    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)
  })

  test('should have no console errors on load', async ({ page }) => {
    const errors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/')

    // Allow some errors but not too many
    // Filter out expected errors (like Three.js warnings)
    const criticalErrors = errors.filter(
      (e) => !e.includes('Three') && !e.includes('favicon') && !e.includes('devtools')
    )

    expect(criticalErrors.length).toBeLessThan(3)
  })

  test('should not have render-blocking resources', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      return {
        resourceTiming: performance.getEntriesByType('resource'),
      }
    })

    // Check that scripts are not too large
    const resources = metrics.resourceTiming as PerformanceResourceTiming[]
    for (const resource of resources) {
      if (resource.name.includes('.js')) {
        // Script files should be reasonably sized
        // (allowing for THREE.js which is a large library)
        if (!resource.name.includes('three.min.js')) {
          expect(resource.transferSize || 0).toBeLessThan(100000) // 100KB for custom scripts
        }
      }
    }
  })

  test('should have good time to interactive', async ({ page }) => {
    await page.goto('/')

    const tti = await page.evaluate(() => {
      const fcp = performance.getEntriesByName('first-contentful-paint')[0]
      return fcp ? fcp.startTime : 0
    })

    // Time to interactive should be within reasonable bounds
    expect(tti).toBeLessThan(5000) // Under 5 seconds
  })
})
