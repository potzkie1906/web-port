import type { NavItem, SectionId, TechId } from '../types'

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const sectionIds: SectionId[] = navItems.map((item) => item.id)

/*
  The floating logos in the hero. The inner ring is the core of your projects,
  the outer ring is foundations and tools. Keep 4–6 inner and 5–8 outer.
*/
export const heroStack: { inner: TechId[]; outer: TechId[] } = {
  inner: ['react', 'nodejs', 'postgresql', 'java', 'javascript'],
  outer: ['html5', 'css3', 'typescript', 'docker', 'git', 'github', 'python'],
}
