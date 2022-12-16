import { mergeRefs } from '@/utils/ref'
import { StrictObject } from '@/utils/strictObject'
import {
  Children,
  cloneElement,
  ExoticComponent,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react'
import { Effects } from './effects'
import { useCursorStyle, useCursorStyleOnHover } from './hooks'
import { Shapes } from './shapes'
import { Style } from './style'

const hoverOnlyComponents = [Effects.Zoom] as const

type HoverOnlyComponents = typeof hoverOnlyComponents[number]
type ComponentProps<T extends string> = T extends 'hover'
  ? { on: T; children: ReactElement }
  : { on: T; children?: ReactElement }
type Component<T> = (
  props: ComponentProps<T extends HoverOnlyComponents ? 'hover' : 'hover' | 'mount'>,
) => ReactElement
type Presets<T> = { [K in keyof T]: Component<T[K]> }

const Clone = forwardRef(function CursorComponent({ children }: { children: ReactNode }, ref: any) {
  if (isValidElement(children)) {
    const child = Children.only(children) as any
    return cloneElement(child, { ...children.props, ref: mergeRefs([ref, child.ref]) })
  }
  return null
})

const OnMount = forwardRef(
  ({ style, children }: { style: Style; children: ReactNode }, ref: any) => (
    <Clone ref={mergeRefs([ref, useCursorStyle(style)])}>{children}</Clone>
  ),
)

const OnHover = forwardRef(
  ({ style, children }: { style: Style; children: ReactNode }, ref: any) => (
    <Clone ref={mergeRefs([ref, useCursorStyleOnHover(style)])}>{children}</Clone>
  ),
)

function buildComponent(style: Style) {
  return forwardRef<ExoticComponent, ComponentProps<string>>(({ on, children }, ref) => {
    const Component = on === 'hover' ? OnHover : OnMount

    return (
      <Component ref={ref} style={style}>
        {children}
      </Component>
    )
  })
}

function buildComponentFromRecord<T extends Record<string, Style>>(data: T): Presets<T> {
  return StrictObject.entries(data).reduce<Partial<Presets<T>>>(
    (presets, [presetName, preset]) => ({
      ...presets,
      [presetName]: buildComponent(preset),
    }),
    {},
  ) as Presets<T>
}

const AllPresets = {
  Shapes: buildComponentFromRecord(Shapes),
  Effects: buildComponentFromRecord(Effects),
} as const

export { AllPresets as Presets }
