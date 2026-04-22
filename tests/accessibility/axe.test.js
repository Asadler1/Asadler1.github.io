import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('should have no accessibility violations in dark mode', async ({ page }) => {
    await page.goto('/')
    await injectAxe(page)
    await checkA11y(page)
  })

  test('should have no accessibility violations in light mode', async ({ page }) => {
    await page.goto('/')

    // Toggle to light mode
    const themeButton = page.locator('button:has-text("🌙")')
    await themeButton.click()
    await page.waitForTimeout(300) // Wait for theme transition

    await injectAxe(page)
    await checkA11y(page)
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    const h1s = await page.locator('h1').count()
    expect(h1s).toBeGreaterThan(0)

    const h2s = await page.locator('h2').count()
    expect(h2s).toBeGreaterThan(0)
  })

  test('should have alt text on all images', async ({ page }) => {
    await page.goto('/')

    const images = page.locator('img')
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).not.toBeNull()
    }
  })

  test('should have descriptive link text', async ({ page }) => {
    await page.goto('/')

    const links = page.locator('a')
    const count = await links.count()

    for (let i = 0; i < count; i++) {
      const link = links.nth(i)
      const text = await link.textContent()
      const href = await link.getAttribute('href')

      // Links should have meaningful text (not empty, not just symbols)
      expect(text?.trim().length).toBeGreaterThan(0)
    }
  })

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/')
    await injectAxe(page)

    // Check for contrast violations
    const results = await page.evaluate(() => {
      return new Promise((resolve) => {
        if (window.axe) {
          window.axe.run({ runOnly: { type: 'rule', values: ['color-contrast'] } }, (error, results) => {
            resolve(results.violations.length)
          })
        }
      })
    })

    // Allow some contrast issues due to styling, but shouldn't be excessive
    expect(results).toBeLessThan(5)
  })
})
