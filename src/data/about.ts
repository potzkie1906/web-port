/*
  Text for the About section. Plain sentences; edit freely.
*/
import type { IconType } from 'react-icons'
import { LuDatabase, LuMonitorSmartphone, LuPalette, LuServer } from 'react-icons/lu'

export interface FocusArea {
  icon: IconType
  title: string
  text: string
  /** Marks your main area with a small "Main focus" label. */
  main?: boolean
}

export const about = {
  title: 'An IT student who builds the whole stack.',
  lead: 'I’m Rodrigo B. Alderite Jr., an Information Technology student at Batangas State University’s Alangilan campus, in the College of Informatics and Computing Sciences.',
  paragraphs: [
    'Right now I’m learning by building two real projects. TransitHub, a route-mapping app for Batangas City, I build on my own: the Spring Boot API, the React frontend with its route map, and the PostgreSQL database. LifeHub, my capstone, is a full-stack dashboard for student life, built with React, Node.js and PostgreSQL.',
    'My main area is the backend: REST APIs, authentication and data. I’m also interested in frontend work, databases and UI/UX, because a good app needs all of them working together.',
  ],
  focusAreas: [
    {
      icon: LuServer,
      title: 'Backend',
      text: 'Spring Boot and Express APIs, with JWT and hashed-password sign-in.',
      main: true,
    },
    {
      icon: LuDatabase,
      title: 'Databases',
      text: 'PostgreSQL in both projects, running in Docker for TransitHub.',
    },
    {
      icon: LuMonitorSmartphone,
      title: 'Frontend',
      text: 'React interfaces, like LifeHub’s dashboard and TransitHub’s route map.',
    },
    {
      icon: LuPalette,
      title: 'UI/UX',
      text: 'Clear layouts that make an app easy to use.',
    },
  ] satisfies FocusArea[],
  /** Shown as `mainArea` in the code card. */
  mainArea: 'backend',
}
