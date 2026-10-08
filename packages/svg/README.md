# @jannchie/icons-svg

[Jannchie Icons](https://icons.jannchie.com) as plain SVG files and SVG sprites, for projects without a JavaScript framework: static sites, server templates, CSS, design tools. Three styles are included; for any other corner radius, stroke weight, duo-tone colors or pixel hinting, use [`@jannchie/icons`](https://www.npmjs.com/package/@jannchie/icons).

```sh
pnpm add @jannchie/icons-svg
```

| Style | Files | Sprite |
|---|---|---|
| Default (radius 2, regular weight) | `svg/<name>.svg` | `sprite.svg` |
| Bold (radius 2, bold weight) | `svg-bold/<name>.svg` | `sprite-bold.svg` |
| Sharp (square corners, regular weight) | `svg-sharp/<name>.svg` | `sprite-sharp.svg` |

`names.json` lists every icon name. Browse the names at [icons.jannchie.com](https://icons.jannchie.com). Each file is 24 × 24, uses `stroke="currentColor"` and has `aria-hidden="true"`. Animated icons (such as `loading-atom`) animate with SVG `<animate>` elements, also inside `<img>`.

## Single files

```html
<img src="/icons/heart.svg" width="24" height="24" alt="Favorite">
```

```js
// Vite, webpack: import the file URL
import heartUrl from '@jannchie/icons-svg/svg/heart.svg?url'
```

An `<img>` cannot inherit the text color: `currentColor` inside it is black. To color the icon, inline the SVG markup, use the sprite (below), or use it as a CSS mask:

```css
.icon-heart {
  width: 1em;
  height: 1em;
  background: currentColor;
  mask: url('/icons/heart.svg') center / contain no-repeat;
}
```

## Sprite

Each sprite has one `<symbol id="<name>">` per icon. Reference a symbol with `<use>`; the icon takes the color of the surrounding text:

```html
<svg width="24" height="24" aria-hidden="true"><use href="/icons/sprite.svg#heart"/></svg>
```

The sprite file must be served from the same origin as the page (browsers do not load external `<use>` references across origins, nor from `file://` pages). The full sprite is about 1 MB (about 160 KB gzipped) because it contains every icon; for production, build a sprite of the icons you use with `toSvg` from `@jannchie/icons`, or copy the `<symbol>` elements you need. You can also paste a sprite into the page (hidden with `style="display:none"`) and reference symbols as `href="#heart"`.

## Accessibility

Icons are decorative: keep `aria-hidden="true"` on the `<svg>` and put the meaning in nearby text or the button's `aria-label`. When an icon stands alone, give an `<img>` an `alt`, or give the sprite's `<svg>` `role="img"` and an `aria-label` instead of `aria-hidden`:

```html
<button type="button" aria-label="Delete">
  <svg width="20" height="20" aria-hidden="true"><use href="/icons/sprite.svg#trash"/></svg>
</button>
```

## Versions

This package has the same version and the same drawings as `@jannchie/icons`; the files are generated with its `toSvg`.

## License

MIT. Some icons refer to or depict third-party characters, logos and marks; their rights stay with their owners. See NOTICE.
