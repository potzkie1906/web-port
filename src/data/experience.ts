/*
  Your timeline, oldest first. Every `null` shows a clearly marked placeholder.
  Fill in dates like '2024' or 'Aug 2025'. kind: 'education' | 'project' | 'goal'.
  color: 'violet' (TransitHub), 'cyan' (LifeHub), 'blue' or 'neutral'.
*/
import type { TimelineEntry } from '../types'

export const timeline: TimelineEntry[] = [
  {
    id: 'batstateu',
    kind: 'education',
    color: 'blue',
    label: 'Education',
    title: 'Information Technology student',
    place: 'Batangas State University, Alangilan campus',
    start: null, // PLACEHOLDER: the year you started, e.g. '2024'
    end: 'Present',
    description: 'College of Informatics and Computing Sciences (CICS).',
    tags: [],
  },
  {
    id: 'transithub',
    kind: 'project',
    color: 'violet',
    label: 'Team project',
    title: 'TransitHub: backend developer',
    place: 'Java OOP class, team of four',
    start: null, // PLACEHOLDER
    end: null, // PLACEHOLDER (or 'Present')
    description:
      'I build the Spring Boot backend and plan the build phases for the team. The backend demonstrates abstraction, encapsulation, inheritance and polymorphism, and the Java code is defended before a panel.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'lifehub',
    kind: 'project',
    color: 'cyan',
    label: 'Capstone project',
    title: 'LifeHub: capstone, in progress',
    place: 'Full-stack student management system',
    start: null, // PLACEHOLDER
    end: null, // PLACEHOLDER (or 'Present')
    description:
      'Built with React, Node.js and Express, and PostgreSQL. Accounts, subjects, assignments, tasks and budgets work; schedule, notes and reminders are next.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    id: 'next',
    kind: 'goal',
    color: 'neutral',
    label: 'Next stop',
    title: null, // PLACEHOLDER: your next (career) goal, e.g. 'Backend internship'
    place: null,
    start: null,
    end: null,
    // Your near-term plans from the project notes. Rewrite it any time.
    description:
      'Short term: finish LifeHub’s schedule, notes and reminders, and load real Batangas City routes into TransitHub.',
    tags: [],
  },
]
