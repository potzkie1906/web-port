import { useCallback, useSyncExternalStore } from 'react'

/** Live result of a CSS media query; re-renders when it changes. */
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

/** True when the visitor asked their system for less motion. */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** True for a mouse or trackpad; false on touch screens. */
export function useFinePointer() {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}
