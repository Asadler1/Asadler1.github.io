import { describe, it, expect } from 'vitest'

describe('calculateBounds - Pure Math Tests', () => {
  // Replicate the bounds calculation logic from index.html for testing
  function calculateBounds(fov, aspect, cameraZ = 5) {
    const vFOV = (fov * Math.PI) / 180
    const height = 2 * Math.tan(vFOV / 2) * cameraZ
    const width = height * aspect
    return { x: width / 2, y: height / 2 }
  }

  it('should calculate correct bounds for default camera FOV (75°)', () => {
    const bounds = calculateBounds(75, 1.5, 5)
    expect(bounds.x).toBeCloseTo(5.27, 1)
    expect(bounds.y).toBeCloseTo(3.52, 1)
  })

  it('should scale bounds with aspect ratio', () => {
    const bounds1 = calculateBounds(75, 1.5, 5)
    const bounds2 = calculateBounds(75, 2.0, 5)
    expect(bounds2.x).toBeGreaterThan(bounds1.x)
    expect(bounds2.y).toEqual(bounds1.y)
  })

  it('should scale bounds with camera Z distance', () => {
    const bounds1 = calculateBounds(75, 1.5, 5)
    const bounds2 = calculateBounds(75, 1.5, 10)
    expect(bounds2.x).toBeCloseTo(bounds1.x * 2, 1)
    expect(bounds2.y).toBeCloseTo(bounds1.y * 2, 1)
  })

  it('should handle 90° FOV', () => {
    const bounds = calculateBounds(90, 1.5, 5)
    expect(bounds.x).toBeGreaterThan(0)
    expect(bounds.y).toBeGreaterThan(0)
  })

  it('should maintain aspect ratio in bounds', () => {
    const bounds = calculateBounds(75, 2.0, 5)
    const ratio = bounds.x / bounds.y
    expect(ratio).toBeCloseTo(2.0, 1)
  })
})
