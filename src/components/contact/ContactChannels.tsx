import type { IconType } from 'react-icons'
import { FaLinkedin } from 'react-icons/fa6'
import { LuArrowUpRight, LuFileText, LuMail, LuMapPin } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import { site } from '../../config/site'
import { CopyButton } from '../ui/CopyButton'
import { Placeholder } from '../ui/Placeholder'

interface Channel {
  key: string
  label: string
  icon: IconType
  /** Text shown in the row. */
  value: string | null
  href: string | null
  external?: boolean
  copy?: boolean
  /** Shown in the placeholder while `value` is missing. */
  missing: string
  hint: string
}

/** "https://github.com/name/" → "github.com/name" */
function shortUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

const CONFIG_HINT = 'Add this in src/config/site.ts'

function buildChannels(): Channel[] {
  const { email, socials, resumeUrl, location } = site
  const channels: Channel[] = [
    {
      key: 'email',
      label: 'Email',
      icon: LuMail,
      value: email,
      href: email ? `mailto:${email}` : null,
      copy: true,
      missing: 'Email address',
      hint: CONFIG_HINT,
    },
    {
      key: 'github',
      label: 'GitHub',
      icon: SiGithub,
      value: socials.github ? shortUrl(socials.github) : null,
      href: socials.github,
      external: true,
      missing: 'GitHub profile',
      hint: CONFIG_HINT,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: FaLinkedin,
      value: socials.linkedin ? shortUrl(socials.linkedin) : null,
      href: socials.linkedin,
      external: true,
      missing: 'LinkedIn profile',
      hint: CONFIG_HINT,
    },
    {
      key: 'resume',
      label: 'Resume',
      icon: LuFileText,
      value: resumeUrl ? 'Open my resume' : null,
      href: resumeUrl,
      external: true,
      missing: 'Resume link',
      hint: 'Put your resume in the public folder, then set resumeUrl in src/config/site.ts',
    },
  ]

  if (location.show && location.label) {
    channels.push({
      key: 'location',
      label: 'Based in',
      icon: LuMapPin,
      value: location.label,
      href: null,
      missing: 'Location',
      hint: CONFIG_HINT,
    })
  }
  return channels
}

const CHANNELS = buildChannels()

/** Email, profiles and resume, each with a clearly marked gap until it's set. */
export function ContactChannels() {
  return (
    <ul className="channels list-reset" role="list">
      {CHANNELS.map((channel) => {
        const Icon = channel.icon
        return (
          <li key={channel.key} className="channel">
            <span className="channel__icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="channel__label">{channel.label}</span>
            <span className="channel__value">
              {channel.value === null ? (
                <Placeholder hint={channel.hint}>{channel.missing}</Placeholder>
              ) : channel.href ? (
                <a
                  className="channel__link"
                  href={channel.href}
                  {...(channel.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : undefined)}
                >
                  {channel.value}
                  {channel.external ? (
                    <>
                      <LuArrowUpRight className="channel__arrow" aria-hidden="true" />
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </>
                  ) : null}
                </a>
              ) : (
                <span>{channel.value}</span>
              )}
            </span>
            {channel.copy && channel.value ? (
              <CopyButton
                text={channel.value}
                label={`${channel.label.toLowerCase()} address`}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
