import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently under the top third of the screen,
 * so the navbar can highlight it.
 */
export function useActiveSection<T extends string>(ids: readonly T[]) {
  const [active, setActive] = useState<T | undefined>(ids[0])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (elements.length === 0) return

    const visible = new Set<string>()
    let atBottom = false

    const pick = () => {
      if (atBottom) {
        setActive(ids[ids.length - 1])
        return
      }
      const current = ids.find((id) => visible.has(id))
      if (current) setActive(current)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        pick()
      },
      // A thin band ~35% from the top of the viewport decides the active section.
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    )
    elements.forEach((element) => observer.observe(element))

    // The last section may be too short to reach the band, so the very bottom
    // of the page always counts as the last section.
    const onScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (bottom !== atBottom) {
        atBottom = bottom
        pick()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])

  return active
}
