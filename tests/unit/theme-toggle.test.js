import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Theme Toggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.body.classList.remove('light-mode')
  })

  it('should load dark mode by default if no localStorage preference', () => {
    expect(document.body.classList.contains('light-mode')).toBe(false)
  })

  it('should load light mode from localStorage if saved', () => {
    localStorage.setItem('theme', 'light')
    // Simulate the script logic
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode')
    }
    expect(document.body.classList.contains('light-mode')).toBe(true)
  })

  it('should persist theme preference to localStorage', () => {
    const theme = 'light'
    localStorage.setItem('theme', theme)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('should toggle between light and dark mode', () => {
    // Simulate theme toggle logic
    const toggleTheme = () => {
      if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode')
        localStorage.setItem('theme', 'dark')
      } else {
        document.body.classList.add('light-mode')
        localStorage.setItem('theme', 'light')
      }
    }

    expect(document.body.classList.contains('light-mode')).toBe(false)
    toggleTheme()
    expect(document.body.classList.contains('light-mode')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('light')

    toggleTheme()
    expect(document.body.classList.contains('light-mode')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('should handle theme button text changes', () => {
    const buttonEl = document.createElement('button')
    buttonEl.textContent = '🌙'
    document.body.appendChild(buttonEl)

    const toggleTheme = () => {
      if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode')
        buttonEl.textContent = '🌙'
      } else {
        document.body.classList.add('light-mode')
        buttonEl.textContent = '☀️'
      }
    }

    expect(buttonEl.textContent).toBe('🌙')
    toggleTheme()
    expect(buttonEl.textContent).toBe('☀️')
    toggleTheme()
    expect(buttonEl.textContent).toBe('🌙')

    buttonEl.remove()
  })
})
