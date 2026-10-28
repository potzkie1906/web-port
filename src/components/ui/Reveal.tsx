import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Extra wait in milliseconds, for gentle staggering. */
  delay?: number
}

/** Fades its content in the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const revealRef = useReveal<HTMLDivElement>()
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined
  return (
    <div ref={revealRef} className={className} style={style} data-reveal="">
      {children}
    </div>
  )
}
