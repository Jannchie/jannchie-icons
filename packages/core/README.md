# @jannchie/icons

Line icons on a 24-unit grid, drawn as code: every icon is redrawn for the requested corner radius and stroke weight, can be pixel-hinted for its display size, and supports a duo-tone variant whose badges and strike-throughs use semantic colors. Browse the set at [icons.jannchie.com](https://icons.jannchie.com).

```sh
pnpm add @jannchie/icons
```

```js
import { IconFolderPlus, toSvg } from '@jannchie/icons'

toSvg(IconFolderPlus)
// <svg ... stroke-width="1.5" ...><path d="M6.25 4.5H7.76a3 3 0 012.12.88..."/></svg>

toSvg(IconFolderPlus, { radius: 'sharp', weight: 'bold', size: 32, duo: true, theme: 'dark' })
```

Each icon is a separate module, so bundlers keep only the icons you import (one icon plus the renderer is about 9 KB gzipped).

| Option | Values | Default |
|---|---|---|
| `radius` | `'sharp'`, `0`, `1`, `2`, `3` | `2` |
| `weight` | `'light'` (1), `'regular'` (1.5), `'bold'` (2) | `'regular'` |
| `size` | width and height of the SVG in px | `24` |
| `duo` | color badges and strike-throughs by meaning | `false` |
| `theme` | `'light'` or `'dark'` recommended colors for `duo` | `'light'` |
| `colors` | overrides: `{ primary, danger, success, warning, info, accent }` | — |

`toPaths(icon, options)` returns the root attributes and per-path attributes instead of a string, for rendering in a framework component; pass `px` (the displayed size in device pixels) to snap strokes to the pixel grid. To look icons up by name, import `icons` from `@jannchie/icons/all` (this includes every icon).

## License

MIT. Some icons depict third-party characters or marks; see NOTICE.
