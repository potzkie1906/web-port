/*
  Your projects. The first two are real and featured; the last two are
  starter drafts whose details still need confirming (status: 'draft').

  Links and screenshots:
  - Set links.repo / links.demo to real URLs when you have them.
  - Put screenshots in public/images/projects/ and set, for example:
    image: { src: './images/projects/routa.png', alt: 'Routa route map' }
    Until then, each card shows an illustration with a "Screenshot coming soon" tag.
*/
import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'routa',
    name: 'Routa',
    featured: true,
    status: 'in-development',
    category: 'Solo project',
    color: 'violet',
    summary:
      'A transportation management and route-mapping web app for Batangas City, centered on the Batangas Grand Terminal.',
    problem:
      'Commuters need a clear picture of which buses, jeepneys and vans leave the Batangas Grand Terminal, and where they go.',
    solution:
      'A web app with a user side, an admin side and an interactive route map, built on real local route data instead of demo data.',
    role: 'Sole developer. I build the whole app: the Spring Boot API, the React frontend and route map, and the PostgreSQL database.',
    team: [],
    features: [
      'Interactive map of bus, jeepney and van routes, with stops and filters',
      'Route lines drawn along the real roads with OSRM',
      'Search for direct routes between two places, fastest or cheapest first',
      'Fares, schedules and stops in order for every route',
      'Service alerts',
      'Sign-in to save favorite routes and report wrong or outdated info',
      'Admin dashboard for routes, stops, transport, alerts, users and reports',
      'Real local route data, not demo data',
      'Soft map style made with CSS filters only, on OpenStreetMap',
    ],
    checklists: [],
    context: {
      title: 'Java OOP class project',
      text: 'The Java 21 backend is built to demonstrate the four pillars of object-oriented programming, and the Java code is defended before a panel.',
      tags: ['Abstraction', 'Encapsulation', 'Inheritance', 'Polymorphism'],
    },
    stack: [
      {
        label: 'Backend',
        items: [
          'java',
          'springboot',
          'maven',
          'springsecurity',
          'jwt',
          'jpa',
          'postgresql',
          'docker',
        ],
      },
      {
        label: 'Frontend',
        items: [
          'react',
          'typescript',
          'vite',
          'tailwind',
          'reactrouter',
          'axios',
          'leaflet',
          'openstreetmap',
        ],
      },
      {
        label: 'Testing',
        items: ['junit', 'vitest'],
      },
    ],
    links: { repo: 'https://github.com/potzkie1906/Routa', demo: null },
    image: null,
    preview: 'transit',
  },
  {
    id: 'lifehub',
    name: 'LifeHub',
    featured: true,
    status: 'in-development',
    category: 'Capstone project',
    color: 'cyan',
    summary:
      'A personal life and student management system: one dashboard for tasks, assignments, expenses, schedules, notes and reminders.',
    problem:
      'Students juggle tasks, assignments, money and schedules across different places, on campus and off it.',
    solution:
      'One dashboard that brings them together, so students can plan school and life in one place.',
    role: null,
    team: [],
    features: [],
    // Move items from "Planned next" to "Working so far" as you finish them.
    checklists: [
      {
        title: 'Working so far',
        done: true,
        items: [
          'Registration and login with hashed passwords',
          'Protected routes and logout',
          'Dashboard',
          'Subjects: add, view and delete',
          'Assignments linked to subjects: mark complete and delete',
          'Tasks',
          'Expense and budget tracking',
        ],
      },
      {
        title: 'Planned next',
        done: false,
        items: ['Schedule', 'Notes', 'Reminders', 'Redesigned sidebar navigation'],
      },
    ],
    context: null,
    stack: [
      {
        label: 'Backend',
        items: ['nodejs', 'express', 'jwt', 'bcrypt', 'postgresql'],
      },
      {
        label: 'Frontend',
        items: ['react', 'javascript', 'vite', 'tailwind', 'reactrouter', 'axios'],
      },
    ],
    links: { repo: 'https://github.com/potzkie1906/lifehub', demo: null },
    image: null,
    preview: 'lifehub',
  },
  {
    id: 'safetrack',
    name: 'SafeTrack',
    featured: false,
    status: 'draft',
    category: 'Safety and alerts',
    color: 'blue',
    summary:
      'An emergency incident reporting and alert system designed to improve incident reporting, location awareness and coordination.',
    problem:
      'Responding to an incident depends on fast, accurate reports and knowing where help is needed.',
    solution:
      'One system for reporting incidents, sending alerts and coordinating with location in view.',
    role: null,
    team: [],
    features: [],
    checklists: [],
    context: null,
    // Not confirmed yet: update to the technologies you actually used.
    stack: [
      {
        label: 'Possible stack (not final)',
        items: ['react', 'typescript', 'javascript'],
      },
    ],
    links: { repo: null, demo: null },
    image: null,
    preview: 'safetrack',
  },
  {
    id: 'lost-and-found',
    name: 'Lost and Found Campus System',
    featured: false,
    status: 'draft',
    category: 'Campus system',
    color: 'blue',
    summary:
      'A campus-focused application for reporting lost items, managing found items, searching records and tracking claims.',
    problem: 'Lost items on campus are hard to trace once they change hands.',
    solution:
      'One place to report lost items, log found ones, search the records and track each claim.',
    role: null,
    team: [],
    features: [],
    checklists: [],
    context: null,
    // Not confirmed yet: C++, Python with Tkinter, or a web stack. Add the real one.
    stack: [],
    links: { repo: null, demo: null },
    image: null,
    preview: 'lostfound',
  },
]

export function getProject(id: string) {
  return projects.find((project) => project.id === id)
}
