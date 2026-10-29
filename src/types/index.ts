import type { IconType } from 'react-icons'
import type { TechId } from '../data/tech'

export type { TechId }

/** Colors that carry meaning across the site: violet = Routa, cyan = LifeHub. */
export type RouteColor = 'violet' | 'cyan' | 'blue'

export type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'contact'

export interface NavItem {
  id: SectionId
  label: string
}

export interface Tech {
  name: string
  icon: IconType
  /** Brand color on the light theme. */
  color: string
  /** Optional brighter brand color for the dark theme. */
  colorDark?: string
}

/* ---------- Site config ---------- */

export type AvailabilityTone = 'building' | 'open' | 'busy'

export interface SiteConfig {
  name: string
  firstName: string
  initials: string
  /** One short line about you, used in the footer and the code card. */
  tagline: string
  school: {
    name: string
    campus: string
    college: string
    collegeShort: string
    program: string
  }
  yearLevel: string | null
  hero: {
    greeting: string
    /** Each string is one line of the big headline. */
    headline: string[]
    description: string
    roles: string[]
  }
  availability: { label: string; tone: AvailabilityTone } | null
  email: string | null
  socials: {
    github: string | null
    linkedin: string | null
  }
  resumeUrl: string | null
  profileImage: { src: string; alt: string } | null
  location: { label: string | null; show: boolean }
  contactFormEndpoint: string | null
}

/* ---------- Projects ---------- */

export type ProjectStatus = 'in-development' | 'completed' | 'draft'
export type ProjectPreviewKind = 'transit' | 'lifehub' | 'safetrack' | 'lostfound'

export interface TeamMember {
  name: string
  role: string
  isMe?: boolean
}

export interface StackGroup {
  label: string
  items: TechId[]
  /** Highlights the group as your own part of a team project. */
  mine?: boolean
}

export interface ProjectChecklist {
  title: string
  items: string[]
  done: boolean
}

export interface Project {
  /** Used for the page anchor, e.g. "routa" → #project-routa. */
  id: string
  name: string
  featured: boolean
  status: ProjectStatus
  category: string
  color: RouteColor
  summary: string
  problem: string
  solution: string
  role: string | null
  team: TeamMember[]
  features: string[]
  checklists: ProjectChecklist[]
  context: { title: string; text: string; tags: string[] } | null
  stack: StackGroup[]
  links: { repo: string | null; demo: string | null }
  /** A real screenshot. While it is null the card shows an illustration. */
  image: { src: string; alt: string } | null
  preview: ProjectPreviewKind
}

/* ---------- Skills ---------- */

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools'

export interface Skill {
  tech: TechId
  category: SkillCategory
  description: string
  /** Project ids from src/data/projects.ts. */
  usedIn: string[]
  /** false = shown in the separate "still learning" list instead of the main grid. */
  confirmed: boolean
}

/* ---------- Experience ---------- */

export type TimelineKind = 'education' | 'project' | 'goal'

export interface TimelineEntry {
  id: string
  kind: TimelineKind
  color: RouteColor | 'neutral'
  label: string
  title: string | null
  place: string | null
  start: string | null
  end: string | null
  description: string | null
  tags: string[]
}
