import type { Project } from '../../types'
import { Placeholder } from '../ui/Placeholder'
import { SpotlightCard } from '../ui/SpotlightCard'
import { TechBadge } from '../ui/TechIcon'
import { ProjectLinks, ProjectMedia, StatusBadge } from './ProjectParts'

/** Smaller card for projects that aren't featured (including drafts). */
export function CompactProject({ project }: { project: Project }) {
  const titleId = `project-${project.id}-title`
  const draft = project.status === 'draft'

  return (
    <article
      id={`project-${project.id}`}
      className="project project--compact"
      data-color={project.color}
      aria-labelledby={titleId}
    >
      <SpotlightCard className="project__card" glow="var(--route)">
        <div className="project__media">
          <ProjectMedia project={project} />
        </div>
        <div className="project__intro">
          <div className="project__meta">
            <span className="badge">{project.category}</span>
            <StatusBadge status={project.status} />
          </div>
          {/* h4: these cards sit under the "More projects" heading (h3). */}
          <h4 id={titleId} className="project__title">
            {project.name}
          </h4>
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

          <div className="project__compact-stack">
            {project.stack.length > 0 ? (
              project.stack.map((group) => (
                <div key={group.label} className="stack-group">
                  <p className="stack-group__label">{group.label}</p>
                  <ul className="stack-group__list list-reset" role="list">
                    {group.items.map((id) => (
                      <li key={id}>
                        <TechBadge id={id} tentative={draft} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <Placeholder hint="Add the technologies in src/data/projects.ts (stack)">
                Stack to be confirmed
              </Placeholder>
            )}
          </div>

          <ProjectLinks project={project} />
        </div>
      </SpotlightCard>
    </article>
  )
}
