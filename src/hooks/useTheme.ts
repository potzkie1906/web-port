import { useCallback, useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'
import { prefersReducedMotion } from '../lib/motion'
import {
  getServerTheme,
  getTheme,
  setTheme,
  subscribeTheme,
  type Theme,
} from '../lib/theme'

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme)

  /**
   * Switches theme. Where the browser supports View Transitions, the new theme
   * grows as a circle from `origin` (the toggle button); otherwise it swaps at once.
   */
  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'

    if (typeof document.startViewTransition !== 'function' || prefersReducedMotion()) {
      setTheme(next)
      return
    }

    const x = origin?.x ?? window.innerWidth / 2
    const y = origin?.y ?? 0
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 620,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {
        // The transition was skipped; the theme has still changed.
      })
  }, [])

  return { theme, setTheme, toggleTheme }
}
