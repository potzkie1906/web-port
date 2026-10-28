import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary'

interface SharedProps {
  variant?: Variant
  size?: 'md' | 'sm'
  /** Leans toward the pointer on hover (mouse/trackpad only). */
  magnetic?: boolean
  icon?: ReactNode
}

type LinkButtonProps = SharedProps & ComponentPropsWithoutRef<'a'>

/** A link styled as a button, for navigation (e.g. "Explore my work"). */
export function LinkButton({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  icon,
  className,
  children,
  ...rest
}: LinkButtonProps) {
  const magnetRef = useMagnetic<HTMLAnchorElement>(0.28)
  return (
    <a
      ref={magnetic ? magnetRef : undefined}
      className={cn(
        'button',
        `button--${variant}`,
        size === 'sm' && 'button--sm',
        className,
      )}
      {...rest}
    >
      <span className="button__label">
        {children}
        {icon}
      </span>
    </a>
  )
}

type ButtonProps = SharedProps & ComponentPropsWithoutRef<'button'>

/** A real <button>, for actions such as submitting the contact form. */
export function Button({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  icon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const magnetRef = useMagnetic<HTMLButtonElement>(0.22)
  return (
    <button
      ref={magnetic ? magnetRef : undefined}
      type={type}
      className={cn(
        'button',
        `button--${variant}`,
        size === 'sm' && 'button--sm',
        className,
      )}
      {...rest}
    >
      <span className="button__label">
        {children}
        {icon}
      </span>
    </button>
  )
}
