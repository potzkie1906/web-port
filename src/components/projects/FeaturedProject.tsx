import type { ReactNode } from 'react'
import { LuCircleCheck, LuCircleDashed, LuStar } from 'react-icons/lu'
import { cn, initialsOf } from '../../lib/utils'
import type { Project } from '../../types'
import { Reveal } from '../ui/Reveal'
import { SpotlightCard } from '../ui/SpotlightCard'
import { TechBadge } from '../ui/TechIcon'
import { ProjectLinks, ProjectMedia, StatusBadge } from './ProjectParts'

/** Large card for a featured project: the pitch on top, the details below. */
export function FeaturedProject({
  project,
  reversed,
}: {
  project: Project
  reversed: boolean
}) {
  const titleId = `project-${project.id}-title`
  const blocks: ReactNode[] = []

  if (project.features.length > 0 || project.context) {
    blocks.push(
      <div className="project-block" key="features">
        {project.features.length > 0 ? (
          <>
            <h4 className="project-block__title">What it does</h4>
            <ul className="project-list list-reset" role="list">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </>
        ) : null}
        {project.context ? (
          <div className="project-context">
            <p className="project-context__title">{project.context.title}</p>
            <p className="project-context__text">{project.context.text}</p>
            <ul className="project-context__tags list-reset" role="list">
              {project.context.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>,
    )
  }

  project.checklists.forEach((list) => {
    blocks.push(
      <div className="project-block" key={list.title}>
        <h4 className="project-block__title">{list.title}</h4>
        <ul className="project-checklist list-reset" role="list" data-done={list.done}>
          {list.items.map((item) => (
            <li key={item}>
              {list.done ? (
                <LuCircleCheck className="project-checklist__icon" aria-hidden="true" />
              ) : (
                <LuCircleDashed className="project-checklist__icon" aria-hidden="true" />
              )}
              {item}
            </li>
          ))}
        </ul>
      </div>,
    )
  })

  if (project.role || project.team.length > 0) {
    blocks.push(
      <div className="project-block" key="team">
        {project.role ? (
          <>
            <h4 className="project-block__title">My role</h4>
            <p className="project-block__text">{project.role}</p>
          </>
        ) : null}
        {project.team.length > 0 ? (
          <>
            <h4 className="project-block__title">Team</h4>
            <ul className="team list-reset" role="list">
              {project.team.map((member) => (
                <li
                  key={member.name}
                  className="team__member"
                  data-me={member.isMe ? 'true' : undefined}
                >
                  <span className="team__avatar" aria-hidden="true">
                    {initialsOf(member.name)}
                  </span>
                  <span className="team__info">
                    <span className="team__name">
                      {member.name}
                      {member.isMe ? <span className="team__me">me</span> : null}
                    </span>
                    <span className="team__role">{member.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>,
    )
  }

  if (project.stack.length > 0) {
    blocks.push(
      <div className="project-block" key="stack">
        <h4 className="project-block__title">Built with</h4>
        {project.stack.map((group) => (
          <div
            key={group.label}
            className="stack-group"
            data-mine={group.mine ? 'true' : undefined}
          >
            {project.stack.length > 1 ? (
              <p className="stack-group__label">{group.label}</p>
            ) : null}
            <ul className="stack-group__list list-reset" role="list">
              {group.items.map((id) => (
                <li key={id}>
                  <TechBadge id={id} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>,
    )
  }

  return (
    <Reveal>
      <article
        id={`project-${project.id}`}
        className={cn('project project--featured', reversed && 'project--reversed')}
        data-color={project.color}
        aria-labelledby={titleId}
      >
        <SpotlightCard className="project__card" glow="var(--route)">
          <div className="project__top">
            <div className="project__media">
              <ProjectMedia project={project} />
            </div>

            <div className="project__intro">
              <div className="project__meta">
                <span className="badge badge--featured">
                  <LuStar aria-hidden="true" />
                  Featured
                </span>
                <span className="badge">{project.category}</span>
                <StatusBadge status={project.status} />
              </div>
              <h3 id={titleId} className="project__title">
                {project.name}
              </h3>
              <p className="project__summary">{project.summary}</p>
              <dl className="project__pitch">
                <div>
                  <dt>Problem</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>Solution</dt>
                  <dd>{project.solution}</dd>
                </div>
              </dl>
              <ProjectLinks project={project} />
            </div>
          </div>

          {blocks.length > 0 ? <div className="project__details">{blocks}</div> : null}
        </SpotlightCard>
      </article>
    </Reveal>
  )
}
