import { Fragment, type CSSProperties } from 'react'
import { cn } from '../../lib/utils'

/**
 * Renders headline lines as words that rise into place on load. Screen readers
 * get the plain sentence; the animated copy is hidden from them.
 */
export function SplitHeadline({
  lines,
  className,
}: {
  lines: string[]
  className?: string
}) {
  const lineWords = lines.map((line) => line.split(' '))
  const firstIndex = lineWords.map((_, lineIndex) =>
    lineWords.slice(0, lineIndex).reduce((count, words) => count + words.length, 0),
  )

  return (
    <>
      <span className="visually-hidden">{lines.join(' ')}</span>
      <span className={cn('split', className)} aria-hidden="true">
        {lineWords.map((words, lineIndex) => (
          <span className="split__line" key={lineIndex}>
            {words.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                <span className="split__mask">
                  <span
                    className="split__word"
                    style={
                      {
                        '--word-index': (firstIndex[lineIndex] ?? 0) + wordIndex,
                      } as CSSProperties
                    }
                  >
                    {word}
                  </span>
                </span>
                {wordIndex < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </>
  )
}
