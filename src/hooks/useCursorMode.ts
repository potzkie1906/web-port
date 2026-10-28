import { useSyncExternalStore } from 'react'
import {
  getCursorMode,
  setCursorMode,
  subscribeCursorMode,
  type CursorMode,
} from '../lib/cursorPreference'

export function useCursorMode() {
  const mode = useSyncExternalStore(
    subscribeCursorMode,
    getCursorMode,
    (): CursorMode => 'custom',
  )
  return [mode, setCursorMode] as const
}
