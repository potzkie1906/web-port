/*
  Theme store. index.html sets the first theme before the page paints; this
  module keeps React in sync and saves the visitor's choice.
*/
export type Theme = 'light' | 'dark'

// Must match the key used by the inline script in index.html.
const STORAGE_KEY = 'portfolio-theme'
const THEME_COLORS: Record<Theme, string> = { dark: '#0c0f16', light: '#f6f6f3' }

const listeners = new Set<() => void>()

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function getServerTheme(): Theme {
  return 'dark'
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme])
  listeners.forEach((listener) => listener())
}

/** Applies a theme and remembers it for the next visit. */
export function setTheme(theme: Theme) {
  applyTheme(theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
}

// Follow the operating system's theme until the visitor picks one themselves.
if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', (event) => {
      if (readSavedTheme() === null) applyTheme(event.matches ? 'light' : 'dark')
    })
}

// If anything else changes the theme attribute, keep the toggle icon in sync.
if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
  new MutationObserver(() => listeners.forEach((listener) => listener())).observe(
    document.documentElement,
    { attributes: true, attributeFilter: ['data-theme'] },
  )
}
