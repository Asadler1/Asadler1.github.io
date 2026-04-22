import { readFileSync } from 'fs'
import { JSDOM } from 'jsdom'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const htmlPath = path.join(__dirname, '../../index.html')
const htmlContent = readFileSync(htmlPath, 'utf-8')

const dom = new JSDOM(htmlContent, {
  url: 'http://localhost:3000/',
  pretendToBeVisual: true,
  resources: 'usable'
})

global.window = dom.window
global.document = dom.window.document
global.navigator = dom.window.navigator

// Mock THREE.js
global.THREE = {
  Scene: class {},
  PerspectiveCamera: class {
    constructor() {
      this.fov = 75
      this.aspect = 1.5
      this.position = { z: 5 }
    }
  },
  WebGLRenderer: class {
    setSize() {}
    render() {}
  },
  Vector3: class {
    constructor(x, y, z) {
      this.x = x
      this.y = y
      this.z = z
    }
  },
  BoxGeometry: class {},
  MeshBasicMaterial: class {},
  Mesh: class {
    position = { x: 0, y: 0, z: 0 }
    rotation = { x: 0, y: 0, z: 0 }
  },
}

// Mock requestAnimationFrame
let rafCallbacks = []
global.requestAnimationFrame = (cb) => {
  rafCallbacks.push(cb)
  return rafCallbacks.length - 1
}
global.cancelAnimationFrame = (id) => {
  rafCallbacks[id] = null
}

// Mock localStorage
global.localStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null
  },
  setItem(key, value) {
    this.data[key] = String(value)
  },
  removeItem(key) {
    delete this.data[key]
  },
  clear() {
    this.data = {}
  }
}

// Mock IntersectionObserver
global.IntersectionObserver = class {
  constructor(callback) {
    this.callback = callback
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window.open
global.window.open = vi.fn()

// Suppress console.warn/error for cleaner test output
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
}
