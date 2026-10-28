import { useEffect, useLayoutEffect, useRef } from 'react'

/**
 * Calls `callback` at most once per animation frame while the page scrolls or
 * resizes (and once after mounting). Good for scroll-linked visuals.
 */
export function useScrollFrame(callback: () => void, enabled = true) {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const run = () => {
      frame = 0
      callbackRef.current()
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [enabled])
}
