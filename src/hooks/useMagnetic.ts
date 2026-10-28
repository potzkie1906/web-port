import { useCallback } from 'react'

/**
 * Ref callback that makes an element lean toward the pointer while hovered.
 * Only active with a mouse/trackpad and when reduced motion is off.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  return useCallback(
    (element: T | null) => {
      if (!element) return
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
      let frame = 0

      const reset = () => {
        cancelAnimationFrame(frame)
        element.style.setProperty('--magnet-x', '0px')
        element.style.setProperty('--magnet-y', '0px')
      }

      const onMove = (event: PointerEvent) => {
        if (!finePointer.matches || reducedMotion.matches) return
        const rect = element.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          element.style.setProperty('--magnet-x', `${(dx * strength).toFixed(2)}px`)
          element.style.setProperty('--magnet-y', `${(dy * strength).toFixed(2)}px`)
        })
      }

      element.addEventListener('pointermove', onMove)
      element.addEventListener('pointerleave', reset)
      return () => {
        element.removeEventListener('pointermove', onMove)
        element.removeEventListener('pointerleave', reset)
        cancelAnimationFrame(frame)
      }
    },
    [strength],
  )
}
