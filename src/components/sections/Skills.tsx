import { useLayoutEffect, useRef, useState } from 'react'
import { getProject } from '../../data/projects'
import { skillCategories, skills, tentativeSkillsCopy } from '../../data/skills'
import { techs } from '../../data/tech'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import { useSlidingIndicator } from '../../hooks/useSlidingIndicator'
import type { SkillCategory } from '../../types'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SpotlightCard } from '../ui/SpotlightCard'
import { TechBadge, TechIcon } from '../ui/TechIcon'
import './Skills.css'

type Filter = 'all' | SkillCategory

const confirmedSkills = skills.filter((skill) => skill.confirmed)
const tentativeSkills = skills.filter((skill) => !skill.confirmed)
const filters: { id: Filter; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: confirmedSkills.length },
  ...skillCategories.map((category) => ({
    ...category,
    count: confirmedSkills.filter((skill) => skill.category === category.id).length,
  })),
]

export function Skills() {
  const [filter, setFilter] = useState<Filter>('all')
  const reducedMotion = useReducedMotion()
  const gridRef = useRef<HTMLUListElement>(null)
  const previousRects = useRef<Map<string, DOMRect>>(new Map())
  const { containerRef, indicatorRef } = useSlidingIndicator<
    HTMLDivElement,
    HTMLSpanElement
  >(filter)

  const visibleSkills =
    filter === 'all'
      ? confirmedSkills
      : confirmedSkills.filter((skill) => skill.category === filter)
  const activeLabel = filters.find((item) => item.id === filter)?.label ?? 'All'

  const changeFilter = (next: Filter) => {
    if (next === filter) return
    // Remember where every card is, so they can glide to their new places.
    const rects = new Map<string, DOMRect>()
    gridRef.current?.querySelectorAll<HTMLElement>('[data-skill]').forEach((element) => {
      rects.set(element.dataset.skill ?? '', element.getBoundingClientRect())
    })
    previousRects.current = rects
    setFilter(next)
  }

  // FLIP animation: cards that stay slide into place, new cards fade in.
  useLayoutEffect(() => {
    const before = previousRects.current
    previousRects.current = new Map()
    const grid = gridRef.current
    if (!grid || before.size === 0 || reducedMotion) return

    grid.querySelectorAll<HTMLElement>('[data-skill]').forEach((element, index) => {
      const previous = before.get(element.dataset.skill ?? '')
      const now = element.getBoundingClientRect()
      if (previous) {
        const dx = previous.left - now.left
        const dy = previous.top - now.top
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return
        element.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: 'translate(0, 0)' },
          ],
          { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        )
      } else {
        element.animate(
          [
            { opacity: 0, transform: 'translateY(12px) scale(0.97)' },
            { opacity: 1, transform: 'none' },
          ],
          {
            duration: 420,
            delay: Math.min(index, 10) * 30,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'backwards',
          },
        )
      }
    })
  }, [filter, reducedMotion])

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          title="The tools I build with."
          intro="Every skill here comes from a real project. The colored tags show where I use it."
        >
          <div
            ref={containerRef}
            className="filter"
            role="group"
            aria-label="Filter skills by category"
          >
            <span ref={indicatorRef} className="filter__indicator" aria-hidden="true" />
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className="filter__button"
                data-indicator-key={item.id}
                aria-pressed={filter === item.id}
                onClick={() => changeFilter(item.id)}
              >
                {item.label}
                <span className="filter__count" aria-hidden="true">
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </SectionHeading>

        <p className="visually-hidden" aria-live="polite">
          {`Showing ${visibleSkills.length} ${filter === 'all' ? '' : `${activeLabel.toLowerCase()} `}skills.`}
        </p>

        <Reveal>
          <ul ref={gridRef} className="skills__grid list-reset" role="list">
            {visibleSkills.map((skill) => {
              const tech = techs[skill.tech]
              return (
                <li key={skill.tech} data-skill={skill.tech} className="skills__item">
                  <SpotlightCard
                    className="skill-card"
                    glow={tech.colorDark ?? tech.color}
                  >
                    <span className="skill-card__icon">
                      <TechIcon id={skill.tech} />
                    </span>
                    <h3 className="skill-card__name">{tech.name}</h3>
                    <p className="skill-card__text">{skill.description}</p>
                    {skill.usedIn.length > 0 ? (
                      <ul className="skill-card__used list-reset" role="list">
                        {skill.usedIn.map((projectId) => {
                          const project = getProject(projectId)
                          if (!project) return null
                          return (
                            <li key={projectId}>
                              <span className="route-chip" data-color={project.color}>
                                {project.name}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    ) : null}
                  </SpotlightCard>
                </li>
              )
            })}
          </ul>
        </Reveal>

        {tentativeSkills.length > 0 ? (
          <Reveal className="skills__also">
            <div className="skills__also-text">
              <h3 className="skills__also-title">{tentativeSkillsCopy.title}</h3>
              <p className="skills__also-note">{tentativeSkillsCopy.note}</p>
            </div>
            <ul className="skills__also-list list-reset" role="list">
              {tentativeSkills.map((skill) => (
                <li key={skill.tech} title={skill.description}>
                  <TechBadge id={skill.tech} tentative />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
