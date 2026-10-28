import { useCallback } from 'react'
import { observeReveal } from '../lib/reveal'

/**
 * Ref callback for scroll reveals. Put it on an element that also has
 * data-reveal="" and the element fades in the first time it scrolls into view.
 */
export function useReveal<T extends HTMLElement>() {
  return useCallback((element: T | null) => {
    if (!element) return
    return observeReveal(element)
  }, [])
}
