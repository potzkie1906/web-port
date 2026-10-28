import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import { LuMenu, LuX } from 'react-icons/lu'
import { site } from '../../config/site'
import { navItems, sectionIds } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { useSlidingIndicator } from '../../hooks/useSlidingIndicator'
import { cn } from '../../lib/utils'
import { LinkButton } from '../ui/Button'
import { Monogram } from '../ui/Monogram'
import { ThemeToggle } from './ThemeToggle'
import './Navbar.css'

export function Navbar() {
  const activeSection = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 60em)')
  const progressRef = useRef<HTMLSpanElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const { containerRef, indicatorRef } = useSlidingIndicator<
    HTMLDivElement,
    HTMLSpanElement
  >(activeSection)

  // The menu only exists on small screens; widening the window closes it.
  const menuVisible = menuOpen && !isDesktop

  // Scroll progress (thin line along the bar) and the "scrolled" glass state.
  useScrollFrame(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    const progress =
      scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
    progressRef.current?.style.setProperty('--progress', progress.toFixed(4))
    setScrolled(window.scrollY > 16)
  })

  // While the menu is open: lock page scroll, make the page behind it inert,
  // move focus into the menu, and let Escape close it.
  useEffect(() => {
    if (!menuVisible) return
    const root = document.documentElement
    const background = [
      document.getElementById('main'),
      document.getElementById('footer'),
    ]
    root.style.overflow = 'hidden'
    background.forEach((element) => {
      if (element) element.inert = true
    })
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      root.style.overflow = ''
      background.forEach((element) => {
        if (element) element.inert = false
      })
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuVisible])

  // Close synchronously so the page is scrollable again before the browser
  // jumps to the section the link points at.
  const closeForNavigation = () => {
    flushSync(() => setMenuOpen(false))
  }

  return (
    <header
      className={cn(
        'site-header',
        scrolled && 'site-header--scrolled',
        menuVisible && 'site-header--menu-open',
      )}
    >
      <nav className="nav" aria-label="Main">
        <a className="nav__brand" href="#home" aria-label={`${site.name}, back to top`}>
          <Monogram />
          <span className="nav__name" aria-hidden="true">
            {site.firstName}
          </span>
        </a>

        <div ref={containerRef} className="nav__links">
          <span ref={indicatorRef} className="nav__indicator" aria-hidden="true" />
          <ul className="nav__list list-reset" role="list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="nav__link"
                  data-indicator-key={item.id}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav__actions">
          <ThemeToggle />
          <LinkButton href="#contact" size="sm" className="nav__cta" magnetic>
            Let’s talk
          </LinkButton>
          <button
            ref={menuButtonRef}
            type="button"
            className="nav__menu-button"
            aria-expanded={menuVisible}
            aria-controls="mobile-menu"
            aria-label={menuVisible ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <LuMenu className="nav__menu-icon nav__menu-icon--open" aria-hidden="true" />
            <LuX className="nav__menu-icon nav__menu-icon--close" aria-hidden="true" />
          </button>
        </div>

        <span ref={progressRef} className="nav__progress" aria-hidden="true" />
      </nav>

      <div
        className="mobile-menu__backdrop"
        data-open={menuVisible}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />
      <div
        id="mobile-menu"
        ref={menuRef}
        className="mobile-menu"
        data-open={menuVisible}
        inert={!menuVisible}
      >
        <ul className="mobile-menu__list list-reset" role="list">
          {navItems.map((item, index) => (
            <li key={item.id} style={{ '--item-index': index } as CSSProperties}>
              <a
                href={`#${item.id}`}
                className="mobile-menu__link"
                aria-current={activeSection === item.id ? 'true' : undefined}
                onClick={closeForNavigation}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <LinkButton
          href="#contact"
          className="mobile-menu__cta"
          onClick={closeForNavigation}
        >
          Let’s talk
        </LinkButton>
      </div>
    </header>
  )
}
