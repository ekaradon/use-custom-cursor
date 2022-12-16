import { forwardRef, useState } from 'react'
import 'reset-css'
import './app.css'
import DropOfWater from './assets/drop-of-water.jpg'
import Square from './assets/square.svg'
import ElementAir from './assets/element-air.svg'
import ElementEarth from './assets/element-earth.svg'
import ElementFire from './assets/element-fire.svg'
import ElementWater from './assets/element-water.svg'
import Feather from './assets/feather.jpg'
import Fire from './assets/fire.jpg'
import {
  Cursor,
  setGlobalStyle,
  useCursorStyle,
  useCursorStyleOnHover,
  useGlobalStyle,
} from './lib'

function CustomCursor() {
  useCursorStyle({
    transition: ['transform', 'border-radius', 'mix-blende-mode']
      .map((transition) => `${transition} 0.3s ease-in-out`)
      .join(', '),
  })

  return (
    <div style={{ display: 'none' }}>
      <Cursor.Shapes.Square on="mount" />
      <Cursor.Effects.Glow on="mount" />
    </div>
  )
}

function Title() {
  return (
    <h1
      className="title"
      ref={useCursorStyleOnHover('Shape.Ring', 'Effect.Fill', 'Effect.Difference')}
    >
      Hover me!
    </h1>
  )
}

function Paragraph() {
  return (
    <p className="paragraph" ref={useCursorStyleOnHover('Effect.Glow', 'Shape.Diamond')}>
      Corpus callosum preserve and cherish that pale blue dot laws of physics two ghostly white
      figures in coveralls and helmets are softly dancing a still more glorious dawn awaits
      permanence of the stars. Citizens of distant epochs emerged into consciousness colonies dream
      of the mind's eye citizens of distant epochs Sea of Tranquility?
    </p>
  )
}

const gallery = [Feather, DropOfWater, Fire]

const Image = forwardRef<HTMLImageElement, JSX.IntrinsicElements['img']>((props, ref) => {
  return <img ref={ref} {...props} alt={props.src?.split('.')[0]} width={200} height={350} />
})

function Photo(props: JSX.IntrinsicElements['img']) {
  return (
    <Cursor.Effects.Grow on="hover">
      <Cursor.Effects.Zoom on="hover">
        <Image {...props} ref={useCursorStyleOnHover('Shape.Ring')} />
      </Cursor.Effects.Zoom>
    </Cursor.Effects.Grow>
  )
}

function ButtonChangeShape(props: { shape: string; setShape: (shape: string) => void }) {
  return (
    <button type="button" onClick={() => props.setShape(props.shape)}>
      <img
        height="100%"
        width="100%"
        src={props.shape}
        alt={props.shape}
        ref={useCursorStyleOnHover('Shape.Mask', 'Effect.Fill')}
      />
    </button>
  )
}

function SetCustomShape(props: { shape: string }) {
  return (
    <div style={{ display: 'none' }}>
      <Cursor.Shapes.Mask on="mount">
        <img height="100%" width="100%" src={props.shape} alt={props.shape} />
      </Cursor.Shapes.Mask>
      <Cursor.Effects.Fill on="mount" />
    </div>
  )
}

function ChangeGlobalStyle() {
  const [shape, setShape] = useState(Square)
  const { color } = useGlobalStyle()

  return (
    <form>
      <fieldset>
        <label>Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setGlobalStyle((prev) => ({ ...prev, color: e.target.value }))}
        />
        <label>Shapes</label>
        <div>
          <ButtonChangeShape shape={Square} setShape={setShape} />
          <ButtonChangeShape shape={ElementAir} setShape={setShape} />
          <ButtonChangeShape shape={ElementEarth} setShape={setShape} />
          <ButtonChangeShape shape={ElementFire} setShape={setShape} />
          <ButtonChangeShape shape={ElementWater} setShape={setShape} />
          {shape !== Square && <SetCustomShape shape={shape} />}
        </div>
      </fieldset>
      <fieldset>
        <label>Width</label>
        <input
          type="range"
          min={0}
          max={100}
          onChange={(e) => setGlobalStyle((prev) => ({ ...prev, width: e.target.value + 'px' }))}
        />
        <label>Height</label>
        <input
          type="range"
          min={0}
          max={100}
          onChange={(e) => setGlobalStyle((prev) => ({ ...prev, height: e.target.value + 'px' }))}
        />
      </fieldset>
    </form>
  )
}

export function UseCursorOnHoverExamples() {
  return (
    <Cursor.Provider height="40px" width="40px">
      <CustomCursor />
      <div className="container">
        <Title />

        <Paragraph />

        <div className="gallery">
          {gallery.map((src) => (
            <Photo key={src} src={src} />
          ))}
        </div>
        <ChangeGlobalStyle />
        <div className="footer">
          <h3>Use Custom Cursor</h3>
          <a
            href="https://github.com/ekaradon/use-custom-cursor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="GitHub Repo stars"
              src="https://img.shields.io/github/stars/ekaradon/use-custom-cursor?style=social"
              style={{ stroke: 'white', color: 'white', fill: 'white' }}
            />
          </a>
        </div>
      </div>
    </Cursor.Provider>
  )
}
