import type { CSSProperties } from 'react'
import { techs } from '../../data/tech'
import { cn } from '../../lib/utils'
import type { TechId } from '../../types'

/** A technology logo in its brand color (adjusted for each theme). */
export function TechIcon({ id, className }: { id: TechId; className?: string }) {
  const tech = techs[id]
  const Icon = tech.icon
  const style = {
    '--brand': tech.color,
    '--brand-dark': tech.colorDark ?? tech.color,
  } as CSSProperties
  return (
    <Icon
      className={cn('tech-icon', className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    />
  )
}

/** Small pill with a logo and name, used on project cards. */
export function TechBadge({
  id,
  tentative = false,
}: {
  id: TechId
  tentative?: boolean
}) {
  return (
    <span className={cn('tech-badge', tentative && 'tech-badge--tentative')}>
      <TechIcon id={id} className="tech-badge__icon" />
      {techs[id].name}
    </span>
  )
}
