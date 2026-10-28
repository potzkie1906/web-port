import { LuArrowUpRight, LuGlobe } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import type { Project, ProjectStatus } from '../../types'
import { Placeholder } from '../ui/Placeholder'
import { ProjectPreview } from './ProjectPreview'

const STATUS_LABELS: Record<ProjectStatus, string> = {
  'in-development': 'In development',
  completed: 'Completed',
  draft: 'Draft: details to confirm',
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={status === 'in-development' ? 'badge badge--live' : 'badge'}
      data-status={status}
    >
      <span className="badge__dot" />
      {STATUS_LABELS[status]}
    </span>
  )
}

/** Repository and live demo links, or clearly marked placeholders. */
export function ProjectLinks({ project }: { project: Project }) {
  const { repo, demo } = project.links
  return (
    <div className="project-links">
      {repo ? (
        <a className="project-link" href={repo} target="_blank" rel="noopener noreferrer">
          <SiGithub aria-hidden="true" />
          Source code
          <LuArrowUpRight className="project-link__arrow" aria-hidden="true" />
          <span className="visually-hidden">{` for ${project.name} (opens in a new tab)`}</span>
        </a>
      ) : (
        <Placeholder hint="Add the repository URL as links.repo in src/data/projects.ts">
          Repo link pending
        </Placeholder>
      )}
      {demo ? (
        <a className="project-link" href={demo} target="_blank" rel="noopener noreferrer">
          <LuGlobe aria-hidden="true" />
          Live demo
          <LuArrowUpRight className="project-link__arrow" aria-hidden="true" />
          <span className="visually-hidden">{` of ${project.name} (opens in a new tab)`}</span>
        </a>
      ) : (
        <Placeholder hint="Add the live demo URL as links.demo in src/data/projects.ts">
          Demo link pending
        </Placeholder>
      )}
    </div>
  )
}

/** A real screenshot if you've added one, otherwise the illustration. */
export function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        className="project-media__image"
        src={project.image.src}
        alt={project.image.alt}
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
      />
    )
  }
  return (
    <div className="project-media__art">
      <ProjectPreview kind={project.preview} />
      <Placeholder
        className="project-media__note"
        hint="Add a screenshot as image in src/data/projects.ts"
      >
        Screenshot coming soon
      </Placeholder>
    </div>
  )
}
