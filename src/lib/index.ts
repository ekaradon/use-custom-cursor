import { CursorProvider, Presets } from './core'

export const Cursor = {
  Provider: CursorProvider,
  ...Presets,
} as const

export {
  setGlobalStyle,
  useCursorStyle,
  useCursorStyleOnHover,
  useGlobalStyle,
  useHideSystemCursor,
} from './core'
