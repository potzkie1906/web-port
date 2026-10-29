/*
  YOUR DETAILS: the main file to edit.

  Anything set to `null` is unknown for now. The site shows a clearly marked
  placeholder for it instead of a fake link. Replace `null` with your real
  value (keep the quotes), save, and the page updates.

  Projects, skills and the timeline live in src/data/.
*/
import type { SiteConfig } from '../types'

export const site: SiteConfig = {
  name: 'Rodrigo B. Alderite Jr.',
  firstName: 'Rodrigo',
  // Shown in the logo and favicon (public/favicon.svg has its own copy).
  initials: 'RBA',
  tagline: 'IT student who builds full-stack projects',

  school: {
    name: 'Batangas State University',
    campus: 'Alangilan campus',
    college: 'College of Informatics and Computing Sciences',
    collegeShort: 'CICS',
    program: 'Information Technology',
  },

  // PLACEHOLDER: your year level, e.g. '2nd year'.
  yearLevel: null,

  hero: {
    greeting: "Hello, world! I'm Rodrigo.",
    // Each string is one line of the big headline.
    headline: ['Building apps', 'from the', 'database up.'],
    // Your original headline idea, if you prefer it:
    // headline: ['Building digital', 'experiences that', 'feel extraordinary.'],
    description:
      'I’m an IT student at Batangas State University who builds full-stack projects: Spring Boot and Express APIs, PostgreSQL databases, and the React interfaces on top.',
    // The typing animation cycles through these.
    roles: [
      'Full-Stack Developer',
      'Frontend Developer',
      'Backend Developer',
      'UI/UX Enthusiast',
      'Problem Solver',
    ],
  },

  // PLACEHOLDER: the small badge at the top of the hero. While this is null,
  // the hero shows "Currently building …" plus a marked "Availability status" gap.
  // Example: availability: { label: 'Open to internships', tone: 'open' },
  // tone: 'open' = green dot, 'busy' = amber dot, 'building' = blue dot.
  availability: null,

  // PLACEHOLDERS: add these when you're ready to share them.
  email: null, // e.g. 'you@example.com'
  socials: {
    github: 'https://github.com/potzkie1906',
    linkedin: null, // e.g. 'https://www.linkedin.com/in/your-name'
  },
  // Put your resume in the public folder (public/resume.pdf), then use './resume.pdf'.
  resumeUrl: null,

  // PLACEHOLDER: put your photo in public/images (e.g. profile.jpg), then use:
  // profileImage: { src: './images/profile.jpg', alt: 'Portrait of Rodrigo B. Alderite Jr.' },
  profileImage: null,

  // You decide whether to show this. Example: { label: 'Batangas, Philippines', show: true }
  location: { label: null, show: false },

  // Optional: a form service URL (for example from Formspree) so the contact
  // form delivers messages straight to your inbox. Without it, the form opens
  // the visitor's email app addressed to `email`. See README.md.
  contactFormEndpoint: null,
}
