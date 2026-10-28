import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import { cn, trackSpotlight } from '../../lib/utils'

type SpotlightCardProps = ComponentPropsWithoutRef<'div'> & {
  /** Glow color, e.g. 'var(--violet-vivid)'. */
  glow?: string
}

/** A card whose border and surface light up around the pointer. */
export function SpotlightCard({
  glow,
  className,
  style,
  onPointerMove,
  children,
  ...rest
}: SpotlightCardProps) {
  const mergedStyle = glow ? ({ ...style, '--spot-color': glow } as CSSProperties) : style
  return (
    <div
      className={cn('spotlight', className)}
      style={mergedStyle}
      data-cursor="card"
      onPointerMove={(event) => {
        trackSpotlight(event)
        onPointerMove?.(event)
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
