import { useEffect, useRef, useState } from 'react'

export type TypewriterPhase = 'typing' | 'holding' | 'deleting' | 'idle'

interface TypewriterOptions {
  /** false = show the first word, still and complete (e.g. reduced motion). */
  enabled?: boolean
  /** true = freeze where it is; it carries on from the same spot when resumed. */
  paused?: boolean
  startDelay?: number
  typeSpeed?: number
  deleteSpeed?: number
  holdTime?: number
}

/**
 * Types each word character by character, holds it, deletes it, then moves on.
 * One timer at a time; it is cleared on pause and on unmount.
 */
export function useTypewriter(
  words: readonly string[],
  {
    enabled = true,
    paused = false,
    startDelay = 900,
    typeSpeed = 68,
    deleteSpeed = 34,
    holdTime = 1800,
  }: TypewriterOptions = {},
) {
  const [state, setState] = useState<{ text: string; phase: TypewriterPhase }>({
    text: '',
    phase: 'idle',
  })
  // Kept outside React state so pausing and resuming continues mid-word.
  const progress = useRef({ wordIndex: 0, length: 0, deleting: false, started: false })

  useEffect(() => {
    if (!enabled || paused || words.length === 0) return
    const current = progress.current
    let timer = 0

    const tick = () => {
      current.started = true
      const word = words[current.wordIndex % words.length] ?? ''

      if (!current.deleting) {
        current.length += 1
        if (current.length >= word.length) {
          current.length = word.length
          current.deleting = true
          setState({ text: word, phase: 'holding' })
          timer = window.setTimeout(tick, holdTime)
          return
        }
        setState({ text: word.slice(0, current.length), phase: 'typing' })
        // Slight irregularity makes the typing feel human.
        timer = window.setTimeout(tick, typeSpeed + Math.random() * 45)
        return
      }

      current.length -= 1
      if (current.length <= 0) {
        current.length = 0
        current.deleting = false
        current.wordIndex = (current.wordIndex + 1) % words.length
        setState({ text: '', phase: 'idle' })
        timer = window.setTimeout(tick, 380)
        return
      }
      setState({ text: word.slice(0, current.length), phase: 'deleting' })
      timer = window.setTimeout(tick, deleteSpeed)
    }

    timer = window.setTimeout(tick, current.started ? 240 : startDelay)
    return () => window.clearTimeout(timer)
  }, [enabled, paused, words, startDelay, typeSpeed, deleteSpeed, holdTime])

  // Reduced motion (or no words): show the first word, still and complete.
  if (!enabled) return { text: words[0] ?? '', phase: 'idle' as TypewriterPhase }
  return state
}
