import { ContactChannels } from '../contact/ContactChannels'
import { ContactForm } from '../contact/ContactForm'
import { Reveal } from '../ui/Reveal'
import './Contact.css'

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__backdrop" aria-hidden="true">
        <div className="contact__glow" />
      </div>

      <div className="container contact__grid">
        <div className="contact__aside">
          <Reveal className="contact__header">
            <h2 id="contact-title" className="contact__title">
              Let’s talk.
            </h2>
            <p className="contact__lead">
              Questions about TransitHub or LifeHub, an idea for a project, or feedback on
              my work: send a message and I’ll get back to you.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <ContactChannels />
          </Reveal>
        </div>

        <Reveal className="contact__main" delay={160}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
