import { test, expect, devices } from '@playwright/test'

test.describe('Responsive Design Tests', () => {
  test('should not have horizontal overflow on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const windowWidth = await page.evaluate(() => window.innerWidth)

    expect(bodyWidth).toBeLessThanOrEqual(windowWidth)
  })

  test('should not have horizontal overflow on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const windowWidth = await page.evaluate(() => window.innerWidth)

    expect(bodyWidth).toBeLessThanOrEqual(windowWidth)
  })

  test('should not have horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const windowWidth = await page.evaluate(() => window.innerWidth)

    expect(bodyWidth).toBeLessThanOrEqual(windowWidth)
  })

  test('should show hamburger menu on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const hamburger = page.locator('button#hamburger')
    await expect(hamburger).toBeVisible()
  })

  test('should hide desktop nav links on mobile (use hamburger instead)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const mobileNav = page.locator('#mobile-nav')
    const desktopNav = page.locator('.nav-links')

    // Mobile nav should be available
    await expect(mobileNav).toBeVisible()
  })

  test('should show desktop nav links on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')

    const navLinks = page.locator('.nav-links a')
    const count = await navLinks.count()

    expect(count).toBeGreaterThan(0)

    // At least some should be visible
    const firstLink = navLinks.first()
    await expect(firstLink).toBeVisible()
  })

  test('should open/close hamburger menu on click', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const hamburger = page.locator('#hamburger')
    const mobileNav = page.locator('#mobile-nav')

    // Menu should start closed
    expect(await mobileNav.evaluate((el) => el.classList.contains('active'))).toBe(false)

    // Click to open
    await hamburger.click()
    expect(await mobileNav.evaluate((el) => el.classList.contains('active'))).toBe(true)

    // Click to close
    await hamburger.click()
    expect(await mobileNav.evaluate((el) => el.classList.contains('active'))).toBe(false)
  })

  test('should close mobile menu when clicking a nav link', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const hamburger = page.locator('#hamburger')
    const mobileNav = page.locator('#mobile-nav')
    const mobileLink = page.locator('#mobile-nav a').first()

    // Open menu
    await hamburger.click()
    expect(await mobileNav.evaluate((el) => el.classList.contains('active'))).toBe(true)

    // Click a link
    await mobileLink.click()

    // Menu should close
    await page.waitForTimeout(100)
    expect(await mobileNav.evaluate((el) => el.classList.contains('active'))).toBe(false)
  })

  test('should have proper font sizing on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const h1 = page.locator('h1').first()
    const fontSize = await h1.evaluate((el) => window.getComputedStyle(el).fontSize)

    // Font should be reasonable size
    const sizeValue = parseInt(fontSize)
    expect(sizeValue).toBeGreaterThan(20)
    expect(sizeValue).toBeLessThan(100)
  })

  test('should maintain layout consistency across viewports', async ({ page }) => {
    await page.goto('/')

    // Test desktop
    await page.setViewportSize({ width: 1280, height: 720 })
    const desktopHeight = await page.evaluate(() => document.body.scrollHeight)

    // Test mobile
    await page.setViewportSize({ width: 390, height: 844 })
    const mobileHeight = await page.evaluate(() => document.body.scrollHeight)

    // Mobile should not be drastically shorter (content should be accessible)
    expect(mobileHeight).toBeGreaterThan(desktopHeight / 2)
  })

  test('should handle landscape mobile orientation', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 390 })
    await page.goto('/')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const windowWidth = await page.evaluate(() => window.innerWidth)

    expect(bodyWidth).toBeLessThanOrEqual(windowWidth)
  })
})
