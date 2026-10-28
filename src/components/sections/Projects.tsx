import { projects } from '../../data/projects'
import { capitalize, numberWord } from '../../lib/utils'
import { CompactProject } from '../projects/CompactProject'
import { FeaturedProject } from '../projects/FeaturedProject'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import './Projects.css'

const featured = projects.filter((project) => project.featured)
const others = projects.filter((project) => !project.featured)

function introText() {
  const active = projects.filter((project) => project.status === 'in-development').length
  const drafts = projects.filter((project) => project.status === 'draft').length
  const parts: string[] = []
  if (active > 0) {
    parts.push(
      `${capitalize(numberWord(active))} ${active === 1 ? 'project' : 'projects'} in active development`,
    )
  }
  if (drafts > 0) {
    parts.push(
      `${parts.length ? 'and ' : ''}${numberWord(drafts)} more with details coming soon`,
    )
  }
  return parts.length ? `${capitalize(parts.join(', '))}.` : undefined
}

export function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          title="What I’m building."
          intro={introText()}
        />

        <div className="projects__featured">
          {featured.map((project, index) => (
            <FeaturedProject
              key={project.id}
              project={project}
              reversed={index % 2 === 1}
            />
          ))}
        </div>

        {others.length > 0 ? (
          <div className="projects__more">
            <Reveal>
              <h3 className="projects__more-title">More projects</h3>
            </Reveal>
            <ul className="projects__more-list list-reset" role="list">
              {others.map((project, index) => (
                <li key={project.id}>
                  <Reveal delay={index * 90}>
                    <CompactProject project={project} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
