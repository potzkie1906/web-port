import type { ReactNode } from 'react'
import { LuPencil } from 'react-icons/lu'
import { cn } from '../../lib/utils'

interface PlaceholderProps {
  children: ReactNode
  /** Where to fill this in; shown as a tooltip. */
  hint?: string
  className?: string
}

/**
 * A clearly marked gap for information that isn't known yet (dashed amber
 * outline). Replace the value in the config/data files and it disappears.
 */
export function Placeholder({
  children,
  hint = 'Placeholder: fill this in under src/config or src/data',
  className,
}: PlaceholderProps) {
  return (
    <span className={cn('placeholder', className)} title={hint}>
      <LuPencil className="placeholder__icon" aria-hidden="true" focusable="false" />
      {children}
    </span>
  )
}
