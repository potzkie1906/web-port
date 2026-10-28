import { useRef } from 'react'
import { timeline } from '../../data/experience'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import type { TimelineEntry } from '../../types'
import { Placeholder } from '../ui/Placeholder'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import './Experience.css'

const DATA_HINT = 'Fill this in under src/data/experience.ts'

function Period({ entry }: { entry: TimelineEntry }) {
  if (entry.kind === 'goal') return <span className="timeline__next">Up next</span>
  return (
    <>
      {entry.start ?? <Placeholder hint={DATA_HINT}>start</Placeholder>}
      <span className="timeline__dash" aria-hidden="true">
        –
      </span>
      <span className="visually-hidden"> to </span>
      {entry.end ?? <Placeholder hint={DATA_HINT}>end</Placeholder>}
    </>
  )
}

/**
 * A vertical "route" through school and projects. The line fills in as you
 * scroll, and each stop lights up as the line reaches it.
 */
export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const reducedMotion = useReducedMotion()

  useScrollFrame(() => {
    const list = listRef.current
    if (!list) return
    const rect = list.getBoundingClientRect()
    const progress = reducedMotion
      ? 1
      : Math.min(1, Math.max(0, (window.innerHeight * 0.62 - rect.top) / rect.height))
    list.style.setProperty('--progress', progress.toFixed(4))
    const reached = progress * rect.height
    list.querySelectorAll<HTMLElement>('[data-stop]').forEach((stop) => {
      const passed = String(stop.offsetTop + 12 <= reached)
      if (stop.dataset.passed !== passed) stop.dataset.passed = passed
    })
  })

  return (
    <section
      id="experience"
      className="section experience"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          id="experience-title"
          title="The path so far."
          intro="School, team projects, and where I’m heading next. Dates are still being filled in."
        />

        <ol ref={listRef} className="timeline list-reset" role="list">
          {timeline.map((entry) => (
            <li
              key={entry.id}
              className="timeline__stop"
              data-stop=""
              data-kind={entry.kind}
              data-color={entry.color}
            >
              <span className="timeline__marker" aria-hidden="true" />
              <p className="timeline__when">
                <Period entry={entry} />
              </p>
              <Reveal className="timeline__body">
                <p className="timeline__label">{entry.label}</p>
                <h3 className="timeline__title">
                  {entry.title ?? (
                    <Placeholder hint={DATA_HINT}>Add your next goal</Placeholder>
                  )}
                </h3>
                {entry.place ? <p className="timeline__place">{entry.place}</p> : null}
                {entry.description ? (
                  <p className="timeline__text">{entry.description}</p>
                ) : (
                  <p className="timeline__text">
                    <Placeholder hint={DATA_HINT}>
                      One sentence about where you’re heading
                    </Placeholder>
                  </p>
                )}
                {entry.tags.length > 0 ? (
                  <ul className="timeline__tags list-reset" role="list">
                    {entry.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
