import type { IconType } from 'react-icons'
import { FaLinkedin } from 'react-icons/fa6'
import { LuArrowUpRight } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import { site } from '../../config/site'
import { cn } from '../../lib/utils'
import { Placeholder } from './Placeholder'
import './SocialLinks.css'

interface SocialItem {
  key: string
  label: string
  url: string | null
  icon: IconType
}

const items: SocialItem[] = [
  { key: 'github', label: 'GitHub', url: site.socials.github, icon: SiGithub },
  { key: 'linkedin', label: 'LinkedIn', url: site.socials.linkedin, icon: FaLinkedin },
]

interface SocialLinksProps {
  /** Show dashed placeholders for links that aren't set yet. */
  showPlaceholders?: boolean
  className?: string
}

/** GitHub and LinkedIn links from src/config/site.ts. */
export function SocialLinks({ showPlaceholders = false, className }: SocialLinksProps) {
  const visible = showPlaceholders ? items : items.filter((item) => item.url)
  if (visible.length === 0) return null

  return (
    <ul className={cn('social-links list-reset', className)} role="list">
      {visible.map((item) => {
        const Icon = item.icon
        return (
          <li key={item.key}>
            {item.url ? (
              <a
                className="social-link"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="social-link__icon" aria-hidden="true" />
                {item.label}
                <LuArrowUpRight className="social-link__arrow" aria-hidden="true" />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            ) : (
              <Placeholder hint={`Add your ${item.label} URL in src/config/site.ts`}>
                {item.label} link
              </Placeholder>
            )}
          </li>
        )
      })}
    </ul>
  )
}
