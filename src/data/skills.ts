/*
  Your skills. Each one says where you use it, so nothing is a vague claim.

  confirmed: false  → shown in the separate "Still learning" list.
  Once you're comfortable with one, set confirmed: true and it moves into
  the main grid. Delete any line you don't want to show.

  usedIn takes project ids from src/data/projects.ts ('routa', 'lifehub').
*/
import type { Skill, SkillCategory } from '../types'

/** Heading and note for the list of not-yet-confirmed skills. */
export const tentativeSkillsCopy = {
  title: 'Still learning',
  note: 'Tools I’ve started using in my projects.',
}

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'tools', label: 'Tools' },
]

export const skills: Skill[] = [
  // Backend: your main area
  {
    tech: 'springboot',
    category: 'backend',
    description:
      'Routa’s API: Maven, Spring Security with JWT, JPA, and JUnit 5 tests. My main area.',
    usedIn: ['routa'],
    confirmed: true,
  },
  {
    tech: 'java',
    category: 'backend',
    description:
      'Routa’s backend, written in Java 21 to show abstraction, encapsulation, inheritance and polymorphism.',
    usedIn: ['routa'],
    confirmed: true,
  },
  {
    tech: 'nodejs',
    category: 'backend',
    description: 'Runs LifeHub’s backend.',
    usedIn: ['lifehub'],
    confirmed: true,
  },
  {
    tech: 'express',
    category: 'backend',
    description: 'LifeHub’s API routes, from login to budgets.',
    usedIn: ['lifehub'],
    confirmed: true,
  },
  {
    tech: 'rest',
    category: 'backend',
    description: 'How the frontend and backend talk in both projects.',
    usedIn: ['routa', 'lifehub'],
    confirmed: true,
  },

  // Database
  {
    tech: 'postgresql',
    category: 'database',
    description: 'The database behind both Routa and LifeHub.',
    usedIn: ['routa', 'lifehub'],
    confirmed: true,
  },
  {
    tech: 'sql',
    category: 'database',
    description: 'Querying and shaping data in both projects.',
    usedIn: ['routa', 'lifehub'],
    confirmed: true,
  },

  // Frontend
  {
    tech: 'react',
    category: 'frontend',
    description: 'The interfaces of LifeHub and Routa.',
    usedIn: ['lifehub', 'routa'],
    confirmed: true,
  },
  {
    tech: 'javascript',
    category: 'frontend',
    description: 'The language of LifeHub, front to back.',
    usedIn: ['lifehub'],
    confirmed: true,
  },
  {
    tech: 'html5',
    category: 'frontend',
    description: 'Semantic structure for the interfaces I build.',
    usedIn: ['lifehub'],
    confirmed: true,
  },
  {
    tech: 'css3',
    category: 'frontend',
    description: 'Layouts and styling for my frontends.',
    usedIn: ['lifehub'],
    confirmed: true,
  },
  {
    tech: 'typescript',
    category: 'frontend',
    description: 'Routa’s frontend language, tested with Vitest.',
    usedIn: ['routa'],
    confirmed: true,
  },
  {
    tech: 'tailwind',
    category: 'frontend',
    description: 'Styling for the Routa and LifeHub frontends.',
    usedIn: ['routa', 'lifehub'],
    confirmed: true,
  },
  {
    tech: 'leaflet',
    category: 'frontend',
    description: 'Routa’s interactive route map, on OpenStreetMap.',
    usedIn: ['routa'],
    confirmed: true,
  },

  // Tools
  {
    tech: 'docker',
    category: 'tools',
    description: 'Runs Routa’s PostgreSQL database in a container.',
    usedIn: ['routa'],
    confirmed: true,
  },
  {
    tech: 'git',
    category: 'tools',
    description: 'Feature branches, commits and pull requests on Routa.',
    usedIn: ['routa'],
    confirmed: true,
  },
  {
    tech: 'github',
    category: 'tools',
    description: 'Hosts my projects; Routa’s changes go through pull requests.',
    usedIn: ['routa'],
    confirmed: true,
  },
  {
    tech: 'vscode',
    category: 'tools',
    description: 'My editor.',
    usedIn: [],
    confirmed: true,
  },
]
