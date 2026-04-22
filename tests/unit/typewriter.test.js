import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

describe('Typewriter Animation', () => {
  let titleElement
  let charIndex
  let titleText
  let typeSpeed

  beforeEach(() => {
    titleElement = document.createElement('h1')
    titleElement.id = 'hero-title'
    document.body.appendChild(titleElement)

    charIndex = 0
    titleText = 'Hello\nWorld'
    typeSpeed = 50

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    titleElement.remove()
  })

  it('should type characters one at a time', () => {
    const typeTitle = () => {
      if (charIndex < titleText.length) {
        const char = titleText[charIndex]
        if (char === '\n') {
          titleElement.innerHTML += '<br>'
        } else {
          titleElement.innerHTML += char
        }
        charIndex++
        setTimeout(typeTitle, typeSpeed)
      }
    }

    typeTitle()
    expect(titleElement.innerHTML).toBe('H')

    vi.advanceTimersByTime(typeSpeed)
    expect(titleElement.innerHTML).toBe('He')

    vi.advanceTimersByTime(typeSpeed)
    expect(titleElement.innerHTML).toBe('Hel')
  })

  it('should convert newlines to line breaks', () => {
    const typeTitle = () => {
      if (charIndex < titleText.length) {
        const char = titleText[charIndex]
        if (char === '\n') {
          titleElement.innerHTML += '<br>'
        } else {
          titleElement.innerHTML += char
        }
        charIndex++
        setTimeout(typeTitle, typeSpeed)
      }
    }

    typeTitle()
    // Type "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(typeSpeed)
    }
    // Should have typed "Hello" and be at the newline
    expect(titleElement.innerHTML).toBe('Hello')

    // Type the newline
    vi.advanceTimersByTime(typeSpeed)
    expect(titleElement.innerHTML).toBe('Hello<br>')
  })

  it('should complete typing when reaching end of text', () => {
    const typeTitle = () => {
      if (charIndex < titleText.length) {
        const char = titleText[charIndex]
        if (char === '\n') {
          titleElement.innerHTML += '<br>'
        } else {
          titleElement.innerHTML += char
        }
        charIndex++
        setTimeout(typeTitle, typeSpeed)
      }
    }

    typeTitle()
    // Advance through entire text
    for (let i = 0; i < titleText.length; i++) {
      vi.advanceTimersByTime(typeSpeed)
    }
    // charIndex should equal length
    expect(charIndex).toBe(titleText.length)
  })

  it('should respect typing speed interval', () => {
    const customSpeed = 100
    const typeTitle = () => {
      if (charIndex < titleText.length) {
        const char = titleText[charIndex]
        if (char === '\n') {
          titleElement.innerHTML += '<br>'
        } else {
          titleElement.innerHTML += char
        }
        charIndex++
        setTimeout(typeTitle, customSpeed)
      }
    }

    typeTitle()
    expect(titleElement.innerHTML).toBe('H')

    vi.advanceTimersByTime(50)
    expect(titleElement.innerHTML).toBe('H') // Should not advance yet

    vi.advanceTimersByTime(50)
    expect(titleElement.innerHTML).toBe('He') // Should advance at 100ms
  })

  it('should handle empty text', () => {
    titleText = ''
    const typeTitle = () => {
      if (charIndex < titleText.length) {
        const char = titleText[charIndex]
        if (char === '\n') {
          titleElement.innerHTML += '<br>'
        } else {
          titleElement.innerHTML += char
        }
        charIndex++
        setTimeout(typeTitle, typeSpeed)
      }
    }

    typeTitle()
    expect(titleElement.innerHTML).toBe('')
    expect(charIndex).toBe(0)
  })

  it('should handle text with only newlines', () => {
    titleText = '\n\n'
    const typeTitle = () => {
      if (charIndex < titleText.length) {
        const char = titleText[charIndex]
        if (char === '\n') {
          titleElement.innerHTML += '<br>'
        } else {
          titleElement.innerHTML += char
        }
        charIndex++
        setTimeout(typeTitle, typeSpeed)
      }
    }

    typeTitle()
    expect(titleElement.innerHTML).toBe('<br>')
    vi.advanceTimersByTime(typeSpeed)
    expect(titleElement.innerHTML).toBe('<br><br>')
  })
})
