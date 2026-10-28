import { about } from '../../data/about'
import { CodeCard } from '../about/CodeCard'
import { ProfilePhoto } from '../about/ProfilePhoto'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import './About.css'

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" title={about.title} />

        <div className="about__grid">
          <Reveal className="about__story">
            <p className="about__lead">{about.lead}</p>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="about__text">
                {paragraph}
              </p>
            ))}

            <ul className="about__focus list-reset" role="list">
              {about.focusAreas.map((area) => {
                const Icon = area.icon
                return (
                  <li key={area.title} className="focus-item">
                    <span className="focus-item__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <h3 className="focus-item__title">
                      {area.title}
                      {area.main ? (
                        <span className="focus-item__main">Main focus</span>
                      ) : null}
                    </h3>
                    <p className="focus-item__text">{area.text}</p>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal className="about__aside" delay={120}>
            <ProfilePhoto />
            <CodeCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
