# @jannchie/iconify-json

[Jannchie Icons](https://icons.jannchie.com) in [Iconify JSON](https://iconify.design/docs/types/iconify-json.html) format, at corner radius 2, in four stroke weights:

| File | Prefix | Stroke width |
|---|---|---|
| `icons.json` | `jannchie` | 1 |
| `light.json` | `jannchie-light` | 0.75 |
| `bold.json` | `jannchie-bold` | 1.5 |
| `heavy.json` | `jannchie-heavy` | 2 |

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
        'jannchie-bold': () => import('@jannchie/iconify-json/bold.json').then(m => m.default),
      },
    }),
  ],
})
```

```html
<span class="i-jannchie-folder-plus" />
```

For other corner radii, sharp corners, duo-tone colors or pixel hinting, use [`@jannchie/icons`](https://www.npmjs.com/package/@jannchie/icons).

## License

MIT. Some icons depict third-party characters or marks; see LICENSE.
