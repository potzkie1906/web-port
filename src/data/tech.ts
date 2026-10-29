/*
  Every technology the site can show, with its logo and brand colors.
  Skills, project badges and the hero constellation all point at these ids.
  To add one: add an entry here, then use its id (e.g. 'vite') elsewhere.
*/
import { FaCss3Alt, FaJava } from 'react-icons/fa6'
import { LuDatabase, LuKeyRound, LuLayers, LuNetwork } from 'react-icons/lu'
import {
  SiApachemaven,
  SiAxios,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiJunit5,
  SiLeaflet,
  SiNodedotjs,
  SiOpenstreetmap,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactrouter,
  SiSpringboot,
  SiSpringsecurity,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
} from 'react-icons/si'
import { TbBrandVscode } from 'react-icons/tb'
import type { Tech } from '../types'

const definitions = {
  html5: { name: 'HTML5', icon: SiHtml5, color: '#e34f26', colorDark: '#f26a43' },
  css3: { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6', colorDark: '#4a9fe6' },
  javascript: {
    name: 'JavaScript',
    icon: SiJavascript,
    color: '#c9a400',
    colorDark: '#f7df1e',
  },
  typescript: {
    name: 'TypeScript',
    icon: SiTypescript,
    color: '#3178c6',
    colorDark: '#4f94e2',
  },
  react: { name: 'React', icon: SiReact, color: '#087ea4', colorDark: '#61dafb' },
  vite: { name: 'Vite', icon: SiVite, color: '#646cff', colorDark: '#8f95ff' },
  tailwind: {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    color: '#0891b2',
    colorDark: '#38bdf8',
  },
  reactrouter: {
    name: 'React Router',
    icon: SiReactrouter,
    color: '#ca4245',
    colorDark: '#f26b72',
  },
  axios: { name: 'Axios', icon: SiAxios, color: '#5a29e4', colorDark: '#9b7bf5' },
  leaflet: { name: 'Leaflet', icon: SiLeaflet, color: '#199900', colorDark: '#4cc23a' },
  openstreetmap: {
    name: 'OpenStreetMap',
    icon: SiOpenstreetmap,
    color: '#5b9b4d',
    colorDark: '#7ebc6f',
  },
  java: { name: 'Java', icon: FaJava, color: '#e76f00', colorDark: '#f89820' },
  springboot: {
    name: 'Spring Boot',
    icon: SiSpringboot,
    color: '#5a9f30',
    colorDark: '#7bc152',
  },
  springsecurity: {
    name: 'Spring Security',
    icon: SiSpringsecurity,
    color: '#5a9f30',
    colorDark: '#7bc152',
  },
  jwt: { name: 'JWT', icon: SiJsonwebtokens, color: '#1f2328', colorDark: '#e6e8ec' },
  bcrypt: { name: 'bcrypt', icon: LuKeyRound, color: '#5b6377', colorDark: '#b4bccc' },
  jpa: { name: 'JPA', icon: LuLayers, color: '#5b6377', colorDark: '#b4bccc' },
  maven: { name: 'Maven', icon: SiApachemaven, color: '#c71a36', colorDark: '#ec5a72' },
  junit: { name: 'JUnit 5', icon: SiJunit5, color: '#1f8c55', colorDark: '#3fc27e' },
  vitest: { name: 'Vitest', icon: SiVitest, color: '#5c8a10', colorDark: '#a3d14b' },
  nodejs: { name: 'Node.js', icon: SiNodedotjs, color: '#4d8c3f', colorDark: '#6cc24a' },
  express: { name: 'Express', icon: SiExpress, color: '#1f2328', colorDark: '#e6e8ec' },
  rest: { name: 'REST APIs', icon: LuNetwork, color: '#2f4fe0', colorDark: '#8fa4ff' },
  postgresql: {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    color: '#336791',
    colorDark: '#6f9fd8',
  },
  sql: { name: 'SQL', icon: LuDatabase, color: '#6a42dc', colorDark: '#b9a4ff' },
  docker: { name: 'Docker', icon: SiDocker, color: '#1d8fe0', colorDark: '#3aa6f2' },
  git: { name: 'Git', icon: SiGit, color: '#e84d31', colorDark: '#f46a4e' },
  github: { name: 'GitHub', icon: SiGithub, color: '#1f2328', colorDark: '#f0f3f6' },
  vscode: {
    name: 'VS Code',
    icon: TbBrandVscode,
    color: '#0078d4',
    colorDark: '#3ea7f2',
  },
  python: { name: 'Python', icon: SiPython, color: '#3776ab', colorDark: '#5a9fd4' },
} satisfies Record<string, Tech>

export type TechId = keyof typeof definitions

export const techs: Record<TechId, Tech> = definitions
