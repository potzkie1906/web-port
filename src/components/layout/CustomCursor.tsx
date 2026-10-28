import { useEffect, useRef } from 'react'
import { useCursorMode } from '../../hooks/useCursorMode'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'
import './CustomCursor.css'

const INTERACTIVE = 'a, button, [role="button"], label, summary, select'
const TEXT_FIELD =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]'

/**
 * A small dot with a trailing ring. Only on mouse/trackpad devices, never with
 * reduced motion, and visitors can switch it off in the footer. Text fields
 * keep the normal text cursor.
 */
export function CustomCursor() {
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const [mode] = useCursorMode()
  const enabled = finePointer && !reducedMotion && mode === 'custom'

  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!enabled || !root || !dot || !ring) return

    const html = document.documentElement
    html.classList.add('has-custom-cursor')

    let x = -100
    let y = -100
    let ringX = x
    let ringY = y
    let frame = 0

    const render = () => {
      // The ring eases toward the pointer; the dot sits exactly on it.
      ringX += (x - ringX) * 0.2
      ringY += (y - ringY) * 0.2
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0)`
      const settled = Math.abs(x - ringX) < 0.1 && Math.abs(y - ringY) < 0.1
      frame = settled ? 0 : requestAnimationFrame(render)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      x = event.clientX
      y = event.clientY
      if (root.dataset.visible !== 'true') {
        ringX = x
        ringY = y
        root.dataset.visible = 'true'
      }
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      let state = 'default'
      if (target?.closest(TEXT_FIELD)) state = 'text'
      else if (target?.closest(INTERACTIVE)) state = 'link'
      else if (target?.closest('[data-cursor="card"]')) state = 'card'
      root.dataset.state = state
    }

    const onDown = () => {
      root.dataset.pressed = 'true'
    }
    const onUp = () => {
      root.dataset.pressed = 'false'
    }
    const onLeaveWindow = (event: MouseEvent) => {
      if (!event.relatedTarget) root.dataset.visible = 'false'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseout', onLeaveWindow)

    return () => {
      html.classList.remove('has-custom-cursor')
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseout', onLeaveWindow)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true" data-visible="false">
      <div ref={ringRef} className="cursor__ring">
        <span className="cursor__ring-shape" />
      </div>
      <div ref={dotRef} className="cursor__dot">
        <span className="cursor__dot-shape" />
      </div>
    </div>
  )
}
