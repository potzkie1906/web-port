import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface SectionHeadingProps {
  /** id for the <h2>, used by the section's aria-labelledby. */
  id: string
  title: string
  intro?: ReactNode
  /** Optional controls shown beside the heading (e.g. filters). */
  children?: ReactNode
}

export function SectionHeading({ id, title, intro, children }: SectionHeadingProps) {
  const revealRef = useReveal<HTMLDivElement>()
  return (
    <div ref={revealRef} className="section-heading" data-reveal="">
      <div className="section-heading__text">
        <h2 id={id} className="section-heading__title">
          {title}
        </h2>
        {intro ? <p className="section-heading__intro">{intro}</p> : null}
      </div>
      {children ? <div className="section-heading__aside">{children}</div> : null}
    </div>
  )
}
