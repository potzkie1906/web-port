import { useId } from 'react'
import { useTheme } from '../../hooks/useTheme'
import './ThemeToggle.css'

/**
 * Sun ↔ moon button. The sun's core grows into a moon while a "bite" circle
 * slides in and the rays fold away; the page theme spreads from the button.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const maskId = `theme-mask-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      className="theme-toggle"
      data-state={theme}
      aria-label={label}
      title={label}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }}
    >
      <svg
        className="theme-toggle__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="#fff" />
          <circle className="theme-toggle__bite" cx="24" cy="10" r="6" fill="#000" />
        </mask>
        <circle
          className="theme-toggle__core"
          cx="12"
          cy="12"
          r="6"
          fill="currentColor"
          mask={`url(#${maskId})`}
        />
        <g
          className="theme-toggle__rays"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  )
}
