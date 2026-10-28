import { useLayoutEffect, useRef } from 'react'

/**
 * Moves an indicator element (a pill behind the active link or filter) to the
 * child marked data-indicator-key={activeKey}. CSS animates the movement.
 */
export function useSlidingIndicator<C extends HTMLElement, I extends HTMLElement>(
  activeKey: string | undefined,
) {
  const containerRef = useRef<C | null>(null)
  const indicatorRef = useRef<I | null>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const indicator = indicatorRef.current
    if (!container || !indicator) return

    const update = () => {
      const target = activeKey
        ? container.querySelector<HTMLElement>(`[data-indicator-key="${activeKey}"]`)
        : null
      if (!target) {
        indicator.dataset.visible = 'false'
        return
      }
      indicator.dataset.visible = 'true'
      indicator.style.setProperty('--indicator-x', `${target.offsetLeft}px`)
      indicator.style.setProperty('--indicator-y', `${target.offsetTop}px`)
      indicator.style.setProperty('--indicator-w', `${target.offsetWidth}px`)
      indicator.style.setProperty('--indicator-h', `${target.offsetHeight}px`)
    }

    update()
    // Enable the sliding transition only after the first placement, so the
    // indicator doesn't fly in from the corner on page load.
    const readyFrame = requestAnimationFrame(() => {
      indicator.dataset.ready = 'true'
    })
    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(container)
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) update()
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(readyFrame)
      resizeObserver.disconnect()
    }
  }, [activeKey])

  return { containerRef, indicatorRef }
}
