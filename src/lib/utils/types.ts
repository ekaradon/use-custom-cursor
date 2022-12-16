/**
 * References:
 * https://stackoverflow.com/a/69019874
 *
 */

export type Maybe<T> = T | null | undefined

export type ObjectType = Record<PropertyKey, unknown>

export type PickByValue<T, V> = Pick<T, { [K in keyof T]: T[K] extends V ? K : never }[keyof T]>

export type ObjectEntries<T> = { [K in keyof T]: [keyof PickByValue<T, T[K]>, T[K]] }[keyof T][]
