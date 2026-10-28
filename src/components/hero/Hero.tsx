import { useEffect, useRef, useState } from 'react'
import { LuPause, LuPlay } from 'react-icons/lu'
import { site } from '../../config/site'
import { projects } from '../../data/projects'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'
import { joinWithAnd } from '../../lib/utils'
import { LinkButton } from '../ui/Button'
import { Placeholder } from '../ui/Placeholder'
import { SocialLinks } from '../ui/SocialLinks'
import { SplitHeadline } from '../ui/SplitHeadline'
import { StackMap } from './StackMap'
import { Typewriter } from './Typewriter'
import './Hero.css'

const inProgress = projects
  .filter((project) => project.status === 'in-development')
  .map((project) => project.name)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  // Visitors can stop the looping animations (typing, drifting logos).
  const [paused, setPaused] = useState(false)

  // A spotlight that lights up the background grid around the pointer.
  useEffect(() => {
    const section = sectionRef.current
    const backdrop = backdropRef.current
    if (!section || !backdrop || !finePointer) return
    let frame = 0
    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        backdrop.style.setProperty('--spot-x', `${x}px`)
        backdrop.style.setProperty('--spot-y', `${y}px`)
        backdrop.dataset.lit = 'true'
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      backdrop.dataset.lit = 'false'
    }
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [finePointer])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero"
      aria-labelledby="hero-title"
      data-paused={paused || undefined}
    >
      <div
        ref={backdropRef}
        className="hero__backdrop"
        aria-hidden="true"
        data-lit="false"
      >
        <div className="hero__glow hero__glow--violet" />
        <div className="hero__glow hero__glow--cyan" />
        <div className="hero__grid" />
        <div className="hero__grid hero__grid--lit" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__status">
            {site.availability ? (
              <span className="badge badge--live" data-tone={site.availability.tone}>
                <span className="badge__dot" />
                {site.availability.label}
              </span>
            ) : (
              <>
                {inProgress.length > 0 ? (
                  <span className="badge badge--live" data-tone="building">
                    <span className="badge__dot" />
                    Currently building {joinWithAnd(inProgress)}
                  </span>
                ) : null}
                <Placeholder hint="Set availability in src/config/site.ts">
                  Availability status
                </Placeholder>
              </>
            )}
          </div>

          <p className="hero__greeting">
            <span className="hero__prompt" aria-hidden="true">
              {'>'}
            </span>{' '}
            {site.hero.greeting}
          </p>

          <h1 id="hero-title" className="hero__title">
            <SplitHeadline lines={site.hero.headline} />
          </h1>

          <Typewriter roles={site.hero.roles} paused={paused} />

          <p className="hero__description">{site.hero.description}</p>

          <div className="hero__actions">
            <LinkButton href="#projects" magnetic>
              Explore my work
            </LinkButton>
            <LinkButton href="#contact" variant="secondary" magnetic>
              Let’s connect
            </LinkButton>
          </div>

          <SocialLinks showPlaceholders className="hero__social" />
        </div>

        <div className="hero__visual">
          <StackMap paused={paused} />
          {reducedMotion ? null : (
            <button
              type="button"
              className="hero__motion"
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? <LuPlay aria-hidden="true" /> : <LuPause aria-hidden="true" />}
              {paused ? 'Play animation' : 'Pause animation'}
            </button>
          )}
        </div>
      </div>

      <a className="hero__scroll" href="#about">
        <span className="hero__scroll-line" aria-hidden="true" />
        Scroll
      </a>
    </section>
  )
}
