<h1 align="center" style="border-bottom: none;">⎋ use-custom-cursor</h1>

<p align="center">
  <a href="https://bundlephobia.com/package/use-custom-cursor@latest" target="\_parent">
    <img alt="" src="https://badgen.net/bundlephobia/minzip/use-custom-cursor" />
  </a>
  <img alt="license" src="https://img.shields.io/npm/l/use-custom-cursor" />
  <a href="https://www.npmjs.com/package/use-custom-cursor">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/use-custom-cursor/latest.svg">
  </a>
</p>

- [Introduction](#introduction)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Node/npm](#nodenpm)
  - [Deno](#deno)
- [Basic usage](#basic-usage)
- [Components](#components)
  - [Cursor.Provider](#cursorprovider)
  - [Cursor.Shapes](#cursorshapes)
  - [Cursor.Effects](#cursoreffects)
- [Hooks](#hooks)
  - [useCursorStyle](#usecursorstyle)
  - [useCursorStyleOnHover](#usecursorstyleonhover)
  - [useGlobalStyle](#useglobalstyle)
  - [useHideSystemCursor](#usehidesystemcursor)

## Introduction

This library is all about customizing the cursor with ease.
This library has no other dependencies than `react` itself and `polished`.
See the [demo](https://ekaradon.github.io/use-custom-cursor/).

## Installation

### Requirements

- React 18^

This library is written with Typescript in mind, but you can use it with Javascript.

### Node/npm

To install `use-custom-cursor`:

```sh
npm install use-custom-cursor@alpha   # npm
yarn add use-custom-cursor@alpha      # yarn
pnpm add use-custom-cursor@alpha      # pnpm
```

### Deno

Not yet supported.

## Basic usage

Overriding the default cursor by a new one:

```tsx
import { Cursor, useCursorStyleOnHover } from 'use-custom-cursor'

function TitleHovered() {
  return <h1 ref={useCursorStyleOnHover('Effect.Fill', 'Effect.Difference')}>Hover me!</h1>
}

function App() {
  return (
    <Cursor.Provider height="40px" width="40px" color="blue">
      <Cursor.Shape.Ring on="mount" />
      <Cursor.Effect.Glow on="hover" />
      <TitleHovered />
    </Cursor.Provider>
  )
}
```

Your cursor can be customized through a `Style` property which can have the following types:

- `string`: when already defined as a default by the library, see [Cursor.Shapes](#Cursor.Shapes) and [Cursor.Effects](#Cursor.Effects) for an exhaustive list
- `CSSProperties`: when you want to manually customize the cursor
- `(props) => CSSProperties`: when you want to customize the cursor depending of the context

## Components

### Cursor.Provider

#### Usage

Should be called at the root level of your application.

#### Returns

`ReactNode` containing every component that should rely on a custom cursor.

#### Props

| Options           | Type                    | Description                                                             |
| ----------------- | ----------------------- | ----------------------------------------------------------------------- |
| children          | ReactNode               | Everything that would benefit from the custom cursor should be there id |
| height            | CSSProperties['height'] | What's the expected height of your cursor                               |
| width             | CSSProperties['width']  | What's the expected width of your cursor                                |
| color             | CSSProperties['color']  | What's the color used when drawing your cursor                          |
| hideDefaultCursor | boolean                 | Define whether or not the default cursor should be hidden               |

#### Example

```tsx
function CursorContainer(props: { children: ReactNode }) {
  return (
    <Cursor.Provider color="#91243E" height="25px" width="25px" hideDefaultCursor={false}>
      {children}
    </Cursor.Provider>
  )
}
```

### Cursor.Shapes

#### Usage

You can find a list of default shapes provided by this library when you want to define a custom cursor. You just need to call the component in order to set the shape accordingly. Once the component is unmounted, the shape is unset from your cursor. Depending of the component, you can specify whether the effect should be applied on mount or on hover (which then require children).

#### Available Shapes

| Name    | requirements                           | On           | Description                                      |
| ------- | -------------------------------------- | ------------ | ------------------------------------------------ |
| Diamond | None                                   | hover, mount | Will set the shape of the cursor to ◇            |
| Mask    | An `img` with an `svg` src as children | hover, mount | Will set the shape of the accordingly to the svg |
| Ring    | None                                   | hover, mount | Will set the shape of the cursor to ○            |
| Square  | None                                   | hover, mount | Will set the shape of the cursor to □            |

#### Example

```tsx
function CustomCursor() {
  return (
    <>
      <Cursor.Shape.Ring on="mount" />
      <Cursor.Shape.Mask on="hover">
        <img src="myCustomShape.svg" alt="cursorShape" />
      </Cursor.Shape.Mask>
    </>
  )
}
```

### Cursor.Effects

#### Usage

You can find a list of default effects provided by this library when you want to define a visual effect of your cursor unrelated to the shapes. You just need to call the component in order to set the effect accordingly. Once the component is unmounted, the effect is removed from your cursor. Depending of the component, you can specify whether the effect should be applied on mount or on hover (which then require children).

#### Available Effects

| Name       | requirements         | On           | Description                                                                      |
| ---------- | -------------------- | ------------ | -------------------------------------------------------------------------------- |
| Difference | None                 | hover, mount | Will inverse the color hovered by your cursor, works well when `Fill` is used to |
| Fill       | None                 | hover, mount | Will fill the interior of the cursor with the color defined globally             |
| Glow       | None                 | hover, mount | Will make your cursor glow outside of its perimeter                              |
| Grow       | None                 | hover, mount | Will enlarge your cursor                                                         |
| Zoom       | An `img` as children | hover        | Will make your cursor zoom the image                                             |

#### Example

```tsx
function CustomCursorEffects() {
  return (
    <>
      <Cursor.Effects.Glow on="mount" />
      <Cursor.Effects.Grow on="mount" />
      <Cursor.Effects.Zoom on="hover">
        <img src="avatar.png" alt="avatar" />
      </Cursor.Effects.Zoom>
    </>
  )
}
```

## Hooks

### useCursorStyle

#### Usage

Should be called when you want to apply a style to your cursor globally once the component where this hooks is called is mounted. The style will be removed once the component is unmounted. This hook can take as many Style as you need. When two arguments override the same property, the latter takes precedence.

#### Example

```tsx
function Example() {
  useCursorStyle(
    'Shapes.Ring',
    'Effects.Glow',
    ({ color }) => ({ outline: `1px solid ${color}` }),
    { padding: '15px' },
  )

  return null
}
```

### useCursorStyleOnHover

#### Usage

When you want to adapt your cursor when the user is specifically hovering an element. This hook can take as many Style as you need. When two arguments override the same property, the latter takes precedence.

#### Example

```tsx
function ImageWithZoom(props: JSX.IntrinsicElements['img']) {
  const imageRef = useCursorStyleOnHover(
    'Shapes.Ring',
    'Effects.Grow',
    'Effects.Zoom',
    ({ color }) => ({ outline: `1px solid ${color}` }),
    { padding: '15px' },
  )

  return <img {...props} ref={imageRef} />
}
```

### useGlobalStyle

#### Usage

When you want to get the global style for your cursor or when you want to modify them.

#### Example

```tsx
function CustomCursor() {
  const { width, height } = useGlobalStyle({ color: 'green' })

  return <CustomCursorShape width={width} height={height} />
}
```

#### Related

Alternatively, if you just want to modify the global style in an event, you can just call `setGlobalStyle` after importing it from the library.

### useHideSystemCursor

#### Usage

When you don't want to hide the default cursor globally but just on some part of your application, you can use this hook to deactivate the cursor.
It can optionaly take a target which will then ensure the default cursor is hidden only when hovering the target.

#### Example

```tsx
function ImageWithZoom(props: JSX.IntrinsicElements['img']) {
  const imageRef = useCursorStyleOnHover('Effects.Zoom')
  useHideSystemCursor(imageRef)

  return <img {...props} ref={imageRef} />
}
```
