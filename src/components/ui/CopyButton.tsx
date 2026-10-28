import { useEffect, useRef, useState } from 'react'
import { LuCheck, LuCopy } from 'react-icons/lu'
import { cn } from '../../lib/utils'

interface CopyButtonProps {
  /** The text that goes on the clipboard. */
  text: string
  /** What is being copied, for screen readers, e.g. "email address". */
  label: string
  className?: string
}

type CopyState = 'idle' | 'copied' | 'failed'

/** Copies `text` to the clipboard and says so for two seconds. */
export function CopyButton({ text, label, className }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>('idle')
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2000)
  }

  const message =
    state === 'copied'
      ? 'Copied'
      : state === 'failed'
        ? 'Couldn’t copy. Select the text instead.'
        : ''

  return (
    <span className={cn('copy', className)}>
      <button
        type="button"
        className="copy__button"
        data-state={state}
        aria-label={`Copy ${label}`}
        title={`Copy ${label}`}
        onClick={copy}
      >
        <LuCopy className="copy__icon copy__icon--copy" aria-hidden="true" />
        <LuCheck className="copy__icon copy__icon--done" aria-hidden="true" />
      </button>
      <span className="copy__status" role="status">
        {message}
      </span>
    </span>
  )
}
