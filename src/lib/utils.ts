import type { PointerEvent } from 'react'

/** Joins class names, skipping empty values. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/** Moves a card's spotlight glow to the pointer (used by .spotlight in ui.css). */
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  const element = event.currentTarget
  const rect = element.getBoundingClientRect()
  element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
  element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
}

/** Two-letter initials for team avatars. */
export function initialsOf(name: string) {
  const words = name
    .replace(/[^\p{L}\s]/gu, ' ')
    .split(/\s+/)
    .filter((word) => word && !/^(jr|sr|ii|iii|iv)$/i.test(word))
  const first = words[0]?.[0] ?? ''
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

export const CURRENT_YEAR = new Date().getFullYear()

const NUMBER_WORDS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
]

/** 2 → "two", 12 → "12". */
export function numberWord(value: number) {
  return NUMBER_WORDS[value] ?? String(value)
}

/** Uppercases the first letter. */
export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** ['A'] → "A", ['A', 'B'] → "A and B", ['A', 'B', 'C'] → "A, B and C". */
export function joinWithAnd(items: string[]) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}
