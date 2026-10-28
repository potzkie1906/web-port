import { useEffect } from 'react'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { useReducedMotion } from '../../hooks/useMediaQuery'

/** A number that counts up from zero the first time it scrolls into view. */
export function CountUp({
  value,
  duration = 1300,
}: {
  value: number
  duration?: number
}) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>('0px 0px -15% 0px')
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !inView || reducedMotion) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      element.textContent = String(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    element.textContent = '0'
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      element.textContent = String(value)
    }
  }, [inView, reducedMotion, value, duration, ref])

  return (
    <span ref={ref} className="count-up">
      {value}
    </span>
  )
}
