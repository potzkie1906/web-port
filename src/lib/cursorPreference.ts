/*
  Lets visitors switch the custom cursor off (footer toggle). Saved per browser.
*/
export type CursorMode = 'custom' | 'native'

const STORAGE_KEY = 'portfolio-cursor'
const listeners = new Set<() => void>()

function readSaved(): CursorMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'native' ? 'native' : 'custom'
  } catch {
    return 'custom'
  }
}

let mode: CursorMode = typeof window === 'undefined' ? 'custom' : readSaved()

export function getCursorMode() {
  return mode
}

export function setCursorMode(next: CursorMode) {
  mode = next
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Storage unavailable: the choice still applies for this visit.
  }
  listeners.forEach((listener) => listener())
}

export function subscribeCursorMode(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
