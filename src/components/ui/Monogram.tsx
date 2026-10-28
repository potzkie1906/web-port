import { site } from '../../config/site'
import { cn } from '../../lib/utils'

/** Your initials in a gradient-edged tile: the site's logo. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span className={cn('monogram', className)} aria-hidden="true">
      {site.initials}
    </span>
  )
}
