# @jannchie/iconify-json

[Jannchie Icons](https://icons.jannchie.com) in [Iconify JSON](https://iconify.design/docs/types/iconify-json.html) format, with one collection for each corner radius and stroke weight (15 in total). The prefix is `jannchie`, followed by the radius and the weight; radius 2 and weight regular are the defaults and are omitted.

| Radius \ Weight | regular (1.5) | light (1) | bold (2) |
|---|---|---|---|
| 2 | `jannchie` | `jannchie-light` | `jannchie-bold` |
| sharp | `jannchie-sharp` | `jannchie-sharp-light` | `jannchie-sharp-bold` |
| 0 | `jannchie-r0` | `jannchie-r0-light` | `jannchie-r0-bold` |
| 1 | `jannchie-r1` | `jannchie-r1-light` | `jannchie-r1-bold` |
| 3 | `jannchie-r3` | `jannchie-r3-light` | `jannchie-r3-bold` |

Each collection is a file named after its prefix without `jannchie-` (`jannchie` itself is `icons.json`), for example `sharp-bold.json`. `collections.json` lists every prefix with its file, radius and weight.

Each collection has `categories` (English category titles), `lastModified` and the usual `info` fields. Icons that look exactly the same in a collection (for example `astro-sun` and `alchemy-gold`) are stored once and the other names are `aliases` of it, so every icon name still works. Like the `@iconify-json/*` packages, the package root exports the default collection, its info and metadata:

```js
import { icons, info, metadata } from '@jannchie/iconify-json'
// icons: the jannchie collection (icons.json), info: info.json, metadata: metadata.json ({ categories })
```

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

MIT, covering the library code and the original icons. Some icons refer to or depict third-party characters, logos and marks; they are fan art or nominative references, their rights stay with their owners, and the MIT license grants no rights to them. See NOTICE for the list.
