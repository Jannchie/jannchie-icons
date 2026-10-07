# @jannchie/iconify-json

[Jannchie Icons](https://icons.jannchie.com) in [Iconify JSON](https://iconify.design/docs/types/iconify-json.html) format, with one collection for each corner radius and stroke weight (20 in total). The prefix is `jannchie`, followed by the radius and the weight; radius 2 and weight regular are the defaults and are omitted.

| Radius \ Weight | regular (1) | light (0.75) | bold (1.5) | heavy (2) |
|---|---|---|---|---|
| 2 | `jannchie` | `jannchie-light` | `jannchie-bold` | `jannchie-heavy` |
| sharp | `jannchie-sharp` | `jannchie-sharp-light` | `jannchie-sharp-bold` | `jannchie-sharp-heavy` |
| 0 | `jannchie-r0` | `jannchie-r0-light` | `jannchie-r0-bold` | `jannchie-r0-heavy` |
| 1 | `jannchie-r1` | `jannchie-r1-light` | `jannchie-r1-bold` | `jannchie-r1-heavy` |
| 3 | `jannchie-r3` | `jannchie-r3-light` | `jannchie-r3-bold` | `jannchie-r3-heavy` |

Each collection is a file named after its prefix without `jannchie-` (`jannchie` itself is `icons.json`), for example `sharp-bold.json`. `collections.json` lists every prefix with its file, radius and weight.

```sh
pnpm add -D @jannchie/iconify-json
```

UnoCSS ([preset-icons](https://unocss.dev/presets/icons)):

```js
// uno.config.js
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        'jannchie': () => import('@jannchie/iconify-json/icons.json').then(m => m.default),
        'jannchie-sharp-bold': () => import('@jannchie/iconify-json/sharp-bold.json').then(m => m.default),
      },
    }),
  ],
})
```

```html
<span class="i-jannchie-folder-plus" />
<span class="i-jannchie-sharp-bold-folder-plus" />
```

For other corner radii, sharp corners, duo-tone colors or pixel hinting, use [`@jannchie/icons`](https://www.npmjs.com/package/@jannchie/icons).

## License

MIT. Some icons depict third-party characters or marks; see LICENSE.
