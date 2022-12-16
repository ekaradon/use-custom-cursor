import { GlobalStyle, Style } from '../style'
import { Mask } from './Mask'

const ShapeList = ['Diamond', 'Mask', 'Ring', 'Square'] as const

export type Shape = typeof ShapeList[number]

function Square({ width, height, color }: GlobalStyle) {
  return {
    border: `3px solid ${color}`,
    width,
    height,
  }
}

function Ring(props: GlobalStyle) {
  return {
    ...Square(props),
    borderRadius: '50%',
  }
}

export const Shapes = {
  Diamond: (props) => ({
    ...Square(props),
    transform: 'rotate(45deg)',
  }),
  Ring,
  Mask,
  Square,
} as const satisfies Record<Shape, Style>
