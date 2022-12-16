import { MutableRefObject, RefCallback } from 'react'
import { isDefined } from './data'

type Ref<T> = MutableRefObject<T> | RefCallback<T>

export function mergeRefs<T>(refs: Array<Ref<T | null>>): RefCallback<T> {
  return (value) => {
    refs.filter(isDefined).forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (typeof ref !== 'string' && 'current' in ref) {
        ref.current = value
      }
    })
  }
}
