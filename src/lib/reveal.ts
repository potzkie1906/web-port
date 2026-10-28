/*
  One shared IntersectionObserver for every scroll reveal on the page.
  It marks an element with data-reveal="shown" once, and CSS does the rest.
*/
let observer: IntersectionObserver | null = null

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).dataset.reveal = 'shown'
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  return observer
}

export function observeReveal(element: HTMLElement) {
  if (typeof IntersectionObserver === 'undefined') {
    element.dataset.reveal = 'shown'
    return () => {}
  }
  const io = getObserver()
  io.observe(element)
  return () => io.unobserve(element)
}
