import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { site } from '../../config/site'
import { heroStack } from '../../data/navigation'
import { projects } from '../../data/projects'
import { techs } from '../../data/tech'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'
import type { TechId } from '../../types'
import { TechIcon } from '../ui/TechIcon'
import './StackMap.css'

const INNER_RADIUS = 0.25
const OUTER_RADIUS = 0.41
/** Maximum pointer parallax, in pixels, for the outer ring. */
const PARALLAX = 14

interface MapNode {
  id: TechId
  ring: 'inner' | 'outer'
  /** Resting position, 0–1 across the square. */
  x: number
  y: number
  depth: number
  drift: number
  speedX: number
  speedY: number
  phase: number
}

/** Places the logos evenly on two orbits around your initials. */
function buildNodes(): MapNode[] {
  const nodes: MapNode[] = []
  const place = (
    ids: TechId[],
    ring: MapNode['ring'],
    radius: number,
    startAngle: number,
    depth: number,
  ) => {
    ids.forEach((id, index) => {
      const n = nodes.length
      const angle = startAngle + (index / ids.length) * Math.PI * 2
      nodes.push({
        id,
        ring,
        x: 0.5 + Math.cos(angle) * radius,
        y: 0.5 + Math.sin(angle) * radius,
        depth,
        // Fixed (not random) variety, so each logo drifts at its own pace.
        drift: 3.5 + (n % 3) * 1.5,
        speedX: 0.32 + ((n * 37) % 11) / 38,
        speedY: 0.28 + ((n * 53) % 13) / 44,
        phase: n * 1.9,
      })
    })
  }
  place(heroStack.inner, 'inner', INNER_RADIUS, -Math.PI / 2, 0.55)
  place(
    heroStack.outer,
    'outer',
    OUTER_RADIUS,
    -Math.PI / 2 + Math.PI / Math.max(heroStack.outer.length, 1),
    1,
  )
  return nodes
}

const NODES = buildNodes()

/** Which of your (non-draft) projects use each technology, for the tooltips. */
const USAGE = new Map(
  NODES.map((node) => [
    node.id,
    projects
      .filter(
        (project) =>
          project.status !== 'draft' &&
          project.stack.some((group) => group.items.includes(node.id)),
      )
      .map((project) => project.name),
  ]),
)

/**
 * The hero's constellation: your stack orbiting your initials. Logos drift
 * gently, lean with the pointer (mouse only), and show a label on hover.
 * Decorative, so it's hidden from screen readers; the Skills section has the
 * same information as text. `paused` freezes it in place.
 */
export function StackMap({ paused = false }: { paused?: boolean }) {
  const reducedMotion = useReducedMotion()
  const finePointer = useFinePointer()
  const mapRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Array<HTMLLIElement | null>>([])
  const spokeRefs = useRef<Array<SVGLineElement | null>>([])
  const [activeId, setActiveId] = useState<TechId | null>(null)
  const pausedRef = useRef(paused)
  // Starts or stops the animation loop; set by the effect below.
  const syncLoop = useRef<() => void>(() => {})

  useEffect(() => {
    pausedRef.current = paused
    syncLoop.current()
  }, [paused])

  useEffect(() => {
    const map = mapRef.current
    if (!map || reducedMotion) return

    let size = map.clientWidth
    const resizeObserver = new ResizeObserver(() => {
      size = map.clientWidth
    })
    resizeObserver.observe(map)

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth) * 2 - 1
      pointer.targetY = (event.clientY / window.innerHeight) * 2 - 1
    }
    if (finePointer)
      window.addEventListener('pointermove', onPointerMove, { passive: true })

    let frame = 0
    let running = false
    let onScreen = false
    // Our own clock, so pausing and resuming carries on from the same spot.
    let clock = 0
    let lastFrame = 0

    const render = (now: number) => {
      clock += lastFrame ? Math.min(now - lastFrame, 64) / 1000 : 0
      lastFrame = now
      pointer.x += (pointer.targetX - pointer.x) * 0.05
      pointer.y += (pointer.targetY - pointer.y) * 0.05

      NODES.forEach((node, index) => {
        const dx =
          Math.sin(clock * node.speedX + node.phase) * node.drift +
          pointer.x * node.depth * PARALLAX
        const dy =
          Math.cos(clock * node.speedY + node.phase * 1.3) * node.drift +
          pointer.y * node.depth * PARALLAX

        const element = nodeRefs.current[index]
        if (element)
          element.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`

        const spoke = spokeRefs.current[index]
        if (spoke && size > 0) {
          spoke.setAttribute('x2', (node.x * 100 + (dx / size) * 100).toFixed(3))
          spoke.setAttribute('y2', (node.y * 100 + (dy / size) * 100).toFixed(3))
        }
      })
      frame = requestAnimationFrame(render)
    }

    // Animate only while the map is on screen and not paused.
    const sync = () => {
      const shouldRun = onScreen && !pausedRef.current
      if (shouldRun && !running) {
        running = true
        lastFrame = 0
        frame = requestAnimationFrame(render)
      } else if (!shouldRun && running) {
        running = false
        cancelAnimationFrame(frame)
      }
    }
    syncLoop.current = sync

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting)
      sync()
    })
    visibility.observe(map)

    return () => {
      syncLoop.current = () => {}
      cancelAnimationFrame(frame)
      visibility.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      // Put everything back at rest (e.g. when reduced motion is switched on).
      NODES.forEach((node, index) => {
        const element = nodeRefs.current[index]
        if (element) element.style.transform = ''
        spokeRefs.current[index]?.setAttribute('x2', String(node.x * 100))
        spokeRefs.current[index]?.setAttribute('y2', String(node.y * 100))
      })
    }
  }, [reducedMotion, finePointer])

  return (
    <div
      ref={mapRef}
      className="stack-map"
      data-active={activeId ? 'true' : undefined}
      aria-hidden="true"
    >
      <div className="stack-map__glow" />

      <svg
        className="stack-map__lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        focusable="false"
      >
        <circle className="stack-map__orbit" cx="50" cy="50" r={INNER_RADIUS * 100} />
        <circle
          className="stack-map__orbit stack-map__orbit--outer"
          cx="50"
          cy="50"
          r={OUTER_RADIUS * 100}
        />
        {NODES.map((node, index) => {
          const tech = techs[node.id]
          return (
            <line
              key={node.id}
              ref={(element) => {
                spokeRefs.current[index] = element
              }}
              className="stack-map__spoke"
              data-ring={node.ring}
              data-active={activeId === node.id ? 'true' : undefined}
              x1="50"
              y1="50"
              x2={node.x * 100}
              y2={node.y * 100}
              style={
                {
                  '--i': index,
                  '--brand': tech.color,
                  '--brand-dark': tech.colorDark ?? tech.color,
                } as CSSProperties
              }
            />
          )
        })}
      </svg>

      <div className="stack-map__hub">
        <span className="stack-map__hub-ring" />
        <span className="stack-map__hub-core">{site.initials}</span>
      </div>

      <ul className="stack-map__nodes list-reset">
        {NODES.map((node, index) => {
          const tech = techs[node.id]
          const usage = USAGE.get(node.id) ?? []
          return (
            <li
              key={node.id}
              ref={(element) => {
                nodeRefs.current[index] = element
              }}
              className="stack-map__node"
              data-ring={node.ring}
              style={
                {
                  left: `${node.x * 100}%`,
                  top: `${node.y * 100}%`,
                  '--i': index,
                  '--brand': tech.color,
                  '--brand-dark': tech.colorDark ?? tech.color,
                } as CSSProperties
              }
              onPointerEnter={() => setActiveId(node.id)}
              onPointerLeave={() =>
                setActiveId((current) => (current === node.id ? null : current))
              }
            >
              <span className="stack-map__tile">
                <TechIcon id={node.id} className="stack-map__icon" />
              </span>
              <span className="stack-map__tooltip">
                <strong>{tech.name}</strong>
                {usage.length > 0 ? <span>{usage.join(' & ')}</span> : null}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
