# @jannchie/icons

Line icons on a 24-unit grid, drawn as code: every icon is redrawn for the requested corner radius and stroke weight, can be pixel-hinted for its display size, and supports a duo-tone variant whose badges and strike-throughs use semantic colors. Browse the set at [icons.jannchie.com](https://icons.jannchie.com).

```sh
pnpm add @jannchie/icons
```

```js
import { IconFolderPlus, toSvg } from '@jannchie/icons'

toSvg(IconFolderPlus)
// <svg ... stroke-width="1.5" ... aria-hidden="true"><path d="M6.25 4.5H7.76a3 3 0 012.12.88..."/></svg>

toSvg(IconFolderPlus, { radius: 'sharp', weight: 'bold', size: '1em', duo: true, theme: 'dark' })
toSvg(IconFolderPlus, { title: 'New folder', attrs: { class: 'icon', 'data-id': 'new' } })
```

Each icon is a separate module, so bundlers keep only the icons you import. One icon plus the renderer is about 10.3 KB gzipped (measured with Vite 8, minified); if you only need the default style, the [static entry](#static-entry) is about 0.8 KB.

| Option | Values | Default |
|---|---|---|
| `radius` | `'sharp'`, `0`, `1`, `2`, `3` | `2` |
| `weight` | `'light'` (1), `'regular'` (1.5), `'bold'` (2) | `'regular'` |
| `size` | width and height: a number (px) or a CSS length such as `'1em'` | `24` |
| `duo` | color badges and strike-throughs by meaning | `false` |
| `theme` | `'light'` or `'dark'` recommended colors for `duo` | `'light'` |
| `colors` | overrides: `{ primary, danger, success, warning, info, accent }` | — |
| `title` | accessible name; see [Accessibility](#accessibility) | — |
| `attrs` | extra attributes for the root `<svg>` (`class`, `style`, `data-*`, …); values are escaped, `null` or `undefined` removes an attribute | — |

`toPaths(icon, options)` returns the root attributes (`svg`), the per-path attributes (`paths`) and, when given, the `title`, for rendering in a framework component; pass `px` (the displayed size in device pixels) to opt into pixel hinting, which shifts the icon so the outer edges of horizontal and vertical strokes land on pixel boundaries; without it the exact geometry is returned. To look icons up by name, import `icons` from `@jannchie/icons/all` (this includes every icon).

Invalid options throw a `RangeError` (unknown `radius` or `weight`) or a `TypeError` (not an icon, invalid attribute name).

## Accessibility

Icons are decorative by default: the root element gets `aria-hidden="true"`, so screen readers skip it and read the surrounding text instead. When an icon carries meaning on its own (an icon-only button, a status mark), pass `title`: the root gets `role="img"` instead, and `toSvg` adds a `<title>` element that names it. `toPaths` returns the title as `title` for your component to render as the first child of `<svg>`.

```js
toSvg(IconTrash, { title: 'Delete' })
// <svg ... role="img"><title>Delete</title><path .../></svg>
```

## Static entry

`@jannchie/icons/static` has the same `Icon*` exports, with the path data of the default style (radius 2, weight regular, single color) computed at build time. It does not include the drawing engine, so other radii, weights, duo-tone colors and pixel hinting are not available, but it is much smaller: one icon plus `toSvg` is about 0.8 KB gzipped, ten icons about 1.5 KB (versus 10.3 KB and 11.7 KB from the main entry).

```js
import { IconHeart, SVG_ATTRS, toSvg } from '@jannchie/icons/static'

toSvg(IconHeart, { size: 20, title: 'Favorite', attrs: { class: 'icon' } })
IconHeart.paths // [{ d: 'M12 20C9 18 3 14.5 ...' }], for rendering with SVG_ATTRS in a component
```

`toSvg` here takes `size`, `title` and `attrs`; its output is the same as the main entry's `toSvg` with default options.

## Deep imports

Single icons can also be imported by name, without going through an index module:

```js
import heart from '@jannchie/icons/icons/heart' // same object as IconHeart
import staticHeart from '@jannchie/icons/static/icons/heart'
```

## Metadata

`@jannchie/icons/meta` exports `meta`, with each icon's `category` (an id), `tags` (search keywords), and, where known, `since` (the version that added it) and `thirdParty` (set on icons that depict third-party characters or marks, see NOTICE), and `categories`, the English title of each category id. It includes every icon, so import it only where you need it (search, documentation).

```js
import { categories, meta } from '@jannchie/icons/meta'

categories[meta.heart.category] // 'Marks & Status'
```

## Module formats

The package ships ES modules and CommonJS (`require`) builds of every entry, with TypeScript types for both. It has no dependencies and no side effects on import (`"sideEffects": false`).

## License

MIT, covering the library code and the original icons. Some icons refer to or depict third-party characters, logos and marks (Chiikawa characters, content rating marks, Creative Commons symbols, GitHub and programming language logos, PlayStation and Xbox buttons, license names). They are fan art or nominative references: their rights stay with their owners, and the MIT license grants no rights to them. See NOTICE for the full list. These icons are still exported from the main entry so existing imports keep working; they are planned to move to a separate entry in 1.0.

## Framework packages

- [`@jannchie/icons-vue`](https://www.npmjs.com/package/@jannchie/icons-vue): a Vue 3 `<JIcon>` component with app-wide defaults for radius and weight, optional pixel hinting, and SSR support.
- [`@jannchie/icons-react`](https://www.npmjs.com/package/@jannchie/icons-react): the same `<JIcon>` for React 18+, with defaults from `<IconProvider>`.
- [`@jannchie/icons-svg`](https://www.npmjs.com/package/@jannchie/icons-svg): plain SVG files and sprites in the default, bold and sharp styles, for use without JavaScript.
