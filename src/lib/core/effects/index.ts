import { rgba } from 'polished'
import { Style } from '../style'
import { Zoom } from './zoom'

const EffectList = ['Difference', 'Fill', 'Glow', 'Grow', 'Zoom'] as const

export type Effect = typeof EffectList[number]

export const Effects = {
  Difference: {
    mixBlendMode: 'difference',
  },
  Fill: ({ color }) => ({
    backgroundColor: color,
  }),
  Glow: ({ color }) => ({
    boxShadow: `2px -3px 41px -1px ${rgba(color, 0.64)}`,
  }),
  Grow: {
    transform: 'scale(1.4)',
  },
  Zoom,
} as const satisfies Record<Effect, Style>
