# @jannchie/icons-react

React component for [Jannchie Icons](https://icons.jannchie.com): one `<JIcon>` renders any icon from [`@jannchie/icons`](https://www.npmjs.com/package/@jannchie/icons), redrawn for the corner radius and stroke weight you choose, snapped to the device pixel grid, with optional duo-tone colors. Set the radius and weight once for the whole app.

```sh
pnpm add @jannchie/icons @jannchie/icons-react
```

```jsx
import { IconFolderPlus, IconHeart } from '@jannchie/icons'
import { JIcon } from '@jannchie/icons-react'

export function Toolbar({ onCreate }) {
  return (
    <>
      <JIcon icon={IconHeart} size={20} />
      <JIcon icon={IconFolderPlus} radius="sharp" weight="bold" duo title="New folder" className="icon" onClick={onCreate} />
    </>
  )
}
```

Icons are imported one by one, so bundlers keep only those you use. One icon, the drawing engine and the component add about 9 KB gzipped to an app (measured with Vite 8); the [static entry](#static-entry) adds about 0.5 KB.

## Props

| Prop | Values | Default |
|---|---|---|
| `icon` | an icon object such as `IconHeart` (required) | — |
| `size` | width and height: a number (px) or a CSS length such as `'1em'` | `24` |
| `radius` | `'sharp'`, `0`, `1`, `2`, `3` | `2` |
| `weight` | `'light'`, `'regular'`, `'bold'` | `'regular'` |
| `duo` | color badges and strike-throughs by meaning | `false` |
| `theme` | `'light'` or `'dark'` recommended colors for `duo` | `'light'` |
| `colors` | overrides: `{ primary, danger, success, warning, info, accent }`, any CSS color including `var(--x)` | — |
| `title` | accessible name, see [Accessibility](#accessibility) | — |
| `hinting` | shift the icon so stroke edges land on device pixels | `false` |

The icon is drawn with `currentColor`, so it follows the text color. All other props (`className`, `style`, event handlers, `aria-*`, `data-*`) go to the root `<svg>`, and `ref` gives you the `SVGSVGElement`. Animated icons (such as `IconLoadingAtom`) play through SVG `<animate>` elements, without JavaScript.

### Pixel hinting

Off by default: icons render with their exact geometry, like other icon sets. Turn it on (`hinting`, or in the defaults) to redraw the icon for `size × devicePixelRatio` device pixels and shift it by less than half a pixel so the outer edges of horizontal and vertical strokes land on pixel boundaries. This sharpens small icons on 1× screens (16 and 20 px) at the cost of sub-pixel offsets between icons. It needs `size` in pixels (a number, `'20'` or `'20px'`) and follows changes of the device pixel ratio.

## App-wide defaults

Wrap the app (or any part of it) in `IconProvider` to give every `JIcon` below it the same radius, weight or size; props on a single icon still win. Nested providers merge with outer ones (`colors` merges role by role).

```jsx
import { IconProvider } from '@jannchie/icons-react'

root.render(
  <IconProvider radius="sharp" weight="bold" size={18}>
    <App />
  </IconProvider>,
)
```

`IconProvider` takes `size`, `radius`, `weight`, `duo`, `theme`, `colors` and `hinting`. Pass a stable `colors` object (a constant or `useMemo`) so that the context value does not change on every render. `IconContext` is exported for reading the merged defaults.

## Server-side rendering

The component is safe to render on the server (Next.js, Remix, Vite SSR): nothing touches `window` at import or render time. The server renders as if the device pixel ratio were 1; during hydration React uses the same value, then re-renders icons with the real ratio, so hydration does not report mismatches.

The main entry uses hooks and starts with `'use client'`, so in the Next.js App Router it works from Server Components as a client component. To render icons inside Server Components without client JavaScript, use the [static entry](#static-entry), which has no hooks.

## Accessibility

Icons are decorative by default: the `<svg>` gets `aria-hidden="true"`, and screen readers read the surrounding text instead. When an icon carries meaning on its own (an icon-only button, a status mark), pass `title`: the `<svg>` gets `role="img"` and a `<title>` child that names it.

```jsx
<button type="button" onClick={remove}>
  <JIcon icon={IconTrash} title="Delete" />
</button>
```

You can also label the button itself (`aria-label="Delete"`) and keep the icon decorative. Props you pass, such as `aria-label` or `aria-hidden`, override the defaults.

## Static entry

`@jannchie/icons-react/static` renders the precomputed icons of [`@jannchie/icons/static`](https://www.npmjs.com/package/@jannchie/icons#static-entry): the default style only (radius 2, regular weight, single color), no hinting, and no drawing engine in the bundle. It takes `icon`, `size` (default 24) and `title`, does not read `IconProvider`, and uses no hooks, so it also renders in React Server Components.

```jsx
import { IconHeart } from '@jannchie/icons/static'
import { JIcon } from '@jannchie/icons-react/static'

<JIcon icon={IconHeart} size="1em" />
```

## Requirements

React 18 or later, and `@jannchie/icons` of the same version as this package (both are peer dependencies). ES modules and CommonJS builds with TypeScript types are included.

## License

MIT. See the [`@jannchie/icons` README](https://www.npmjs.com/package/@jannchie/icons#license) for third-party marks among the icons.
