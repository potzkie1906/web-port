import { LuArrowUp, LuMousePointer2 } from 'react-icons/lu'
import { site } from '../../config/site'
import { navItems } from '../../data/navigation'
import { useCursorMode } from '../../hooks/useCursorMode'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'
import { CURRENT_YEAR } from '../../lib/utils'
import { Monogram } from '../ui/Monogram'
import { SocialLinks } from '../ui/SocialLinks'
import './Footer.css'

export function Footer() {
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const [cursorMode, setCursorMode] = useCursorMode()
  // The cursor switch only appears where the custom cursor can run.
  const cursorAvailable = finePointer && !reducedMotion

  return (
    <footer id="footer" className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <Monogram />
          <div>
            <p className="site-footer__name">{site.name}</p>
            <p className="site-footer__tagline">{site.tagline}</p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="site-footer__links list-reset" role="list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className="site-footer__social" />
      </div>

      <div className="container site-footer__bottom">
        <p className="site-footer__note">
          <code>{'// Thanks for scrolling all the way down.'}</code>
        </p>
        <p className="site-footer__copy">
          © {CURRENT_YEAR} {site.name}
        </p>
        <div className="site-footer__tools">
          {cursorAvailable ? (
            <button
              type="button"
              className="site-footer__tool"
              aria-pressed={cursorMode === 'custom'}
              onClick={() => setCursorMode(cursorMode === 'custom' ? 'native' : 'custom')}
            >
              <LuMousePointer2 aria-hidden="true" />
              Custom cursor
              <span className="site-footer__state" aria-hidden="true">
                {cursorMode === 'custom' ? 'On' : 'Off'}
              </span>
            </button>
          ) : null}
          <a className="site-footer__tool" href="#home">
            <LuArrowUp aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
