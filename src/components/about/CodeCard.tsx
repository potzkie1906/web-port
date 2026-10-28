import type { ReactNode } from 'react'
import { site } from '../../config/site'
import { about } from '../../data/about'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import { CountUp } from '../ui/CountUp'
import { Placeholder } from '../ui/Placeholder'

const Str = ({ value }: { value: string }) => (
  <span className="tok-string">{`"${value}"`}</span>
)

/**
 * A small "editor window" describing you as a TypeScript object. Every value
 * comes from your config and data files, so it stays accurate as you edit them.
 */
export function CodeCard() {
  const technologies = skills.filter((skill) => skill.confirmed).length
  const inProgress = projects.filter((project) => project.status === 'in-development')
  const transitTeam =
    projects.find((project) => project.id === 'transithub')?.team.length ?? 0

  const entries: Array<{ key: string; value: ReactNode; comment?: string }> = [
    { key: 'studies', value: <Str value={site.school.program} /> },
    { key: 'school', value: <Str value={site.school.name} /> },
    {
      key: 'campus',
      value: <Str value={`${site.school.campus}, ${site.school.collegeShort}`} />,
    },
    {
      key: 'yearLevel',
      value: site.yearLevel ? (
        <Str value={site.yearLevel} />
      ) : (
        <Placeholder hint="Set yearLevel in src/config/site.ts">
          add year level
        </Placeholder>
      ),
    },
    ...(site.location.show && site.location.label
      ? [{ key: 'location', value: <Str value={site.location.label} /> }]
      : []),
    { key: 'mainArea', value: <Str value={about.mainArea} /> },
    {
      key: 'technologies',
      value: (
        <span className="tok-number">
          <CountUp value={technologies} />
        </span>
      ),
    },
    {
      key: 'projectsInProgress',
      value: (
        <span className="tok-number">
          <CountUp value={inProgress.length} />
        </span>
      ),
    },
    {
      key: 'teamSize',
      value: (
        <span className="tok-number">
          <CountUp value={transitTeam} />
        </span>
      ),
      comment: '// TransitHub',
    },
    {
      key: 'building',
      value: (
        <>
          <span className="tok-punct">[</span>
          {inProgress.map((project, index) => (
            <span key={project.id}>
              <Str value={project.name} />
              {index < inProgress.length - 1 ? (
                <span className="tok-punct">, </span>
              ) : null}
            </span>
          ))}
          <span className="tok-punct">]</span>
        </>
      ),
    },
  ]

  const lines: ReactNode[] = [
    <>
      <span className="tok-keyword">const</span> <span className="tok-name">rodrigo</span>{' '}
      <span className="tok-punct">= {'{'}</span>
    </>,
    ...entries.map((entry) => (
      <>
        <span className="code-card__indent" />
        <span className="tok-prop">{entry.key}</span>
        <span className="tok-punct">: </span>
        {entry.value}
        <span className="tok-punct">,</span>
        {entry.comment ? <span className="tok-comment"> {entry.comment}</span> : null}
      </>
    )),
    <span className="tok-punct">{'}'}</span>,
  ]

  return (
    <figure className="code-card">
      <div className="code-card__bar">
        <span className="code-card__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <figcaption className="code-card__file">rodrigo.ts</figcaption>
      </div>
      <pre className="code-card__code">
        <code>
          {lines.map((line, index) => (
            <span className="code-card__line" key={index}>
              <span className="code-card__number" aria-hidden="true">
                {index + 1}
              </span>
              <span className="code-card__text">{line}</span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}
