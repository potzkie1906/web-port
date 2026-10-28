import { useReducedMotion } from '../../hooks/useMediaQuery'
import { useTypewriter } from '../../hooks/useTypewriter'

/**
 * `const role = "…";` with the role typed and deleted one character at a time.
 * The line has a fixed height and sits on its own, so nothing jumps around.
 */
export function Typewriter({
  roles,
  paused = false,
}: {
  roles: readonly string[]
  paused?: boolean
}) {
  const reducedMotion = useReducedMotion()
  const { text, phase } = useTypewriter(roles, { enabled: !reducedMotion, paused })

  return (
    <p className="typewriter">
      <span className="visually-hidden">{`Roles: ${roles.join(', ')}.`}</span>
      <code className="typewriter__code" aria-hidden="true">
        <span className="tok-keyword">const</span> <span className="tok-name">role</span>{' '}
        <span className="tok-punct">=</span>{' '}
        <span className="tok-string">
          {'"'}
          {text}
          <span className="typewriter__caret" data-phase={phase} />
          {'"'}
        </span>
        <span className="tok-punct">;</span>
      </code>
    </p>
  )
}
