import { Maybe } from '@/utils/types'
import { getState } from '../store'
import { Style } from '../style'

function getCursorPos(e: MouseEvent, target: HTMLElement) {
  const boundingBox = target.getBoundingClientRect()

  return {
    x: e.pageX - boundingBox.left - window.pageXOffset,
    y: e.pageY - boundingBox.top - window.pageYOffset,
  }
}

type moveMagnifierProps = {
  image: HTMLImageElement
  cursor: HTMLElement
  event: MouseEvent
  zoom?: number
}

function moveMagnifier({ event, cursor, image, zoom = 2 }: moveMagnifierProps) {
  const { x, y } = getCursorPos(event, image)

  const imageWidth = image.offsetWidth
  const imageHeight = image.offsetHeight

  const w = cursor.offsetWidth / 2
  const h = cursor.offsetHeight / 2

  const backgroundPosition = `-${x * zoom - w}px -${y * zoom - h}px`
  const backgroundSize = `${imageWidth * zoom}px ${imageHeight * zoom}px`

  cursor.style.backgroundImage = `url(${image.src})`
  cursor.style.backgroundPosition = backgroundPosition
  cursor.style.backgroundRepeat = 'no-repeat'
  cursor.style.backgroundSize = backgroundSize
}

let controller: Maybe<AbortController>

export const Zoom = function Zoom({ target }) {
  const image = target?.current
  const { cursor } = getState()

  if (!target || !cursor) {
    return {}
  }

  if (!(image instanceof HTMLImageElement)) {
    throw Error('Zoom can only be used on an image.')
  }

  controller?.abort()
  controller = new AbortController()
  image.addEventListener('mousemove', (event) => moveMagnifier({ event, image, cursor }), {
    signal: controller.signal,
  })

  return {
    backgroundImage: 'none',
    backgroundPosition: 'inherit',
    backgroundRepeat: 'inherit',
    backgroundSize: 'inherit',
  }
} satisfies Style
