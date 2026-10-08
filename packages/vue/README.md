# @jannchie/icons-vue

Vue 3 component for [Jannchie Icons](https://icons.jannchie.com): one `<JIcon>` renders any icon from [`@jannchie/icons`](https://www.npmjs.com/package/@jannchie/icons), redrawn for the corner radius and stroke weight you choose, snapped to the device pixel grid, with optional duo-tone colors. Set the radius and weight once for the whole app.

```sh
pnpm add @jannchie/icons @jannchie/icons-vue
```

```vue
<script setup>
import { IconFolderPlus, IconHeart } from '@jannchie/icons'
import { JIcon } from '@jannchie/icons-vue'
</script>

<template>
  <JIcon :icon="IconHeart" :size="20" />
  <JIcon :icon="IconFolderPlus" radius="sharp" weight="bold" duo title="New folder" class="icon" @click="create" />
</template>
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

The icon is drawn with `currentColor`, so it follows the text color. Other attributes, `class`, `style` and listeners go to the root `<svg>`. Animated icons (such as `IconLoadingAtom`) play through SVG `<animate>` elements, without JavaScript.

### Pixel hinting

Off by default: icons render with their exact geometry, like other icon sets. Turn it on (`:hinting="true"`, or in the defaults) to redraw the icon for `size × devicePixelRatio` device pixels and shift it by less than half a pixel so the outer edges of horizontal and vertical strokes land on pixel boundaries. This sharpens small icons on 1× screens (16 and 20 px) at the cost of sub-pixel offsets between icons. It needs `size` in pixels (a number, `'20'` or `'20px'`) and follows changes of the device pixel ratio.

## App-wide defaults

Install the plugin to give every `JIcon` the same radius, weight or size; props on a single icon still win.

```js
import { JIconPlugin } from '@jannchie/icons-vue'

createApp(App).use(JIconPlugin, { radius: 'sharp', weight: 'bold', size: 18 }).mount('#app')
```

For a part of the app, call `provideIconDefaults` in a component's `setup`; it applies to that component's subtree and merges with outer defaults (`colors` merges role by role). It accepts a plain object, a ref, a reactive object or a getter, so defaults can follow a setting:

```vue
<script setup>
import { provideIconDefaults } from '@jannchie/icons-vue'

const props = defineProps({ dense: Boolean })
provideIconDefaults(() => ({ weight: props.dense ? 'light' : 'regular', size: props.dense ? 16 : 20 }))
</script>
```

Defaults can set `size`, `radius`, `weight`, `duo`, `theme`, `colors` and `hinting`.

## Server-side rendering

The component is safe to render on the server (Nuxt, Vite SSR): nothing touches `window` at import or render time. The server renders as if the device pixel ratio were 1; after the first icon mounts in the browser, the real ratio is read and icons are redrawn if it differs. Hydration does not report mismatches.

## Accessibility

Icons are decorative by default: the `<svg>` gets `aria-hidden="true"`, and screen readers read the surrounding text instead. When an icon carries meaning on its own (an icon-only button, a status mark), pass `title`: the `<svg>` gets `role="img"` and a `<title>` child that names it.

```vue
<button type="button" @click="remove">
  <JIcon :icon="IconTrash" title="Delete" />
</button>
```

You can also label the button itself (`aria-label="Delete"`) and keep the icon decorative. Attributes you pass, such as `aria-label` or `aria-hidden`, override the defaults.

## Static entry

`@jannchie/icons-vue/static` renders the precomputed icons of [`@jannchie/icons/static`](https://www.npmjs.com/package/@jannchie/icons#static-entry): the default style only (radius 2, regular weight, single color), no hinting, and no drawing engine in the bundle. It takes `icon`, `size` and `title`; `size` falls back to the plugin's default.

```vue
<script setup>
import { IconHeart } from '@jannchie/icons/static'
import { JIcon } from '@jannchie/icons-vue/static'
</script>

<template>
  <JIcon :icon="IconHeart" size="1em" />
</template>
```

## Requirements

Vue 3.3 or later, and `@jannchie/icons` of the same version as this package (both are peer dependencies). ES modules and CommonJS builds with TypeScript types are included.

## License

MIT. See the [`@jannchie/icons` README](https://www.npmjs.com/package/@jannchie/icons#license) for third-party marks among the icons.
