import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Easter Egg Sequence', () => {
  let easterEggSequence
  let easterEggCode
  let triggerEasterEgg

  beforeEach(() => {
    easterEggSequence = []
    easterEggCode = ['r', 'e', 'a', 'l']
    global.window.open = vi.fn()

    triggerEasterEgg = (key) => {
      if (easterEggCode.includes(key)) {
        easterEggSequence.push(key)
        if (easterEggSequence.length > 4) {
          easterEggSequence.shift()
        }
        if (easterEggSequence.join('') === 'real') {
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
          easterEggSequence = []
        }
      }
    }
  })

  it('should accumulate key presses in sequence', () => {
    triggerEasterEgg('r')
    expect(easterEggSequence).toEqual(['r'])
    triggerEasterEgg('e')
    expect(easterEggSequence).toEqual(['r', 'e'])
  })

  it('should trigger easter egg when correct sequence is typed', () => {
    triggerEasterEgg('r')
    triggerEasterEgg('e')
    triggerEasterEgg('a')
    triggerEasterEgg('l')
    expect(window.open).toHaveBeenCalledWith(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      '_blank'
    )
  })

  it('should reset sequence after easter egg triggers', () => {
    triggerEasterEgg('r')
    triggerEasterEgg('e')
    triggerEasterEgg('a')
    triggerEasterEgg('l')
    expect(easterEggSequence).toEqual([])
  })

  it('should not trigger with partial sequence', () => {
    triggerEasterEgg('r')
    triggerEasterEgg('e')
    triggerEasterEgg('a')
    expect(window.open).not.toHaveBeenCalled()
  })

  it('should ignore invalid keys', () => {
    triggerEasterEgg('x')
    triggerEasterEgg('y')
    triggerEasterEgg('z')
    expect(easterEggSequence).toEqual([])
    expect(window.open).not.toHaveBeenCalled()
  })

  it('should trim buffer when exceeding 4 keys', () => {
    triggerEasterEgg('r')
    triggerEasterEgg('e')
    triggerEasterEgg('a')
    triggerEasterEgg('l')
    triggerEasterEgg('r') // should shift off the first 'r'
    expect(easterEggSequence).toEqual(['e', 'a', 'l', 'r'])
  })

  it('should break sequence with wrong key', () => {
    triggerEasterEgg('r')
    triggerEasterEgg('e')
    triggerEasterEgg('x') // wrong key
    triggerEasterEgg('a')
    triggerEasterEgg('l')
    expect(window.open).not.toHaveBeenCalled()
  })
})
