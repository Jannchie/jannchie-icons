<p align="center">
  <img src=".github/banner.svg" alt="Jannchie Icons" width="100%">
</p>

<p align="center">
  <a href="https://icons.jannchie.com">Website</a> · <a href="README.zh-CN.md">中文</a>
</p>

Jannchie Icons is a line icon library of 2,500+ icons on a 24-unit grid. Corner radius and stroke weight are inputs to each icon's geometry, not CSS overrides: every icon is redrawn for the selected setting, so corners stay consistent at any radius, dots and fine details keep their proportions at heavier weights, and horizontal and vertical strokes land on whole pixels on HiDPI screens.

Besides the usual interface icons, the set covers symbol systems that general-purpose libraries rarely include: Hiragana and Katakana, Greek letters, Heavenly Stems and Earthly Branches, the Chinese zodiac, I Ching trigrams and hexagrams, runes, alchemical symbols, Maya numerals, music notation, xiangqi and shogi pieces, content rating marks, Creative Commons and license badges, and laundry care symbols.

## Usage

Open [icons.jannchie.com](https://icons.jannchie.com), choose a corner radius and a stroke weight, select an icon, and copy or download the SVG. The `heart` icon at radius 2, weight Regular:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 20C9 18 3 14.5 3 9.25 3 6.5 5 4.5 7.5 4.5c2 0 3.5 1 4.5 2.5 1-1.5 2.5-2.5 4.5-2.5 2.5 0 4.5 2 4.5 4.75C21 14.5 15 18 12 20z"/>
</svg>
```

Exported SVGs use `currentColor`, so they inherit the surrounding text color. The preview site aligns every icon to the device pixel grid at its displayed size, so lines render crisply at any size and pixel density. The [Examples](https://icons.jannchie.com/?view=examples) view shows the icons in common interface components such as navigation, toolbars, file lists, and notifications, rendered with the current settings.

| Option | Values | Effect |
|---|---|---|
| Radius | Sharp, 0, 1, 2, 3 | Corner radius of outlines; Sharp also switches to square caps and miter joins |
| Weight | Light 1, Regular 1.5, Bold 2 | Stroke width; dots and reduced-size details are capped separately |

## Use in a project

| Package | Use it for |
|---|---|
| [`@jannchie/icons`](packages/core) | SVG strings or path data from JavaScript, with any radius, weight, size, duo-tone colors and pixel hinting |
| [`@jannchie/iconify-json`](packages/iconify-json) | UnoCSS, Iconify and other Iconify-based tools (one collection per radius and weight) |

```js
import { IconFolderPlus, toSvg } from '@jannchie/icons'

toSvg(IconFolderPlus, { radius: 2, weight: 'regular', size: 24 })
```

## Development

```sh
pnpm install
pnpm dev              # preview site with hot reload
pnpm build            # static site in dist/
pnpm brand            # regenerate the banner, OG image and favicons
pnpm build:packages   # build packages/core and packages/iconify-json
pnpm test             # render smoke test, output snapshot, naming and category checks
pnpm audit:icons      # grid / square-cap / crowding audits against their baselines
```

Each icon is one file in `src/icons/` that returns a list of path strings for a given setting. The preview site picks up new files automatically, and `src/categories.js` assigns them to a category by name.

```js
// src/icons/plus-circle.js
import { ring } from '../marks'

export default () => [ring(), 'M12 8V16', 'M8 12H16']
```

Shared shapes and helpers live in `src/geometry.js` (rounded polygons, circles) and `src/letters.js` (line lettering for badges and numerals). Pushes to `main` deploy the site to GitHub Pages.

### Checks

CI (`.github/workflows/ci.yml`) runs on every push and pull request: `pnpm build:packages`, `pnpm test` and `pnpm audit:icons`. Run them locally before opening a PR.

- `pnpm test` renders every icon (animated ones included) at all 15 corner × weight settings through the public `toSvg` / `toPaths` API and checks the SVG and path data; checks that file names are unique kebab-case (`[a-z0-9-]`) and that every icon lands in a category other than "Uncategorized" (`src/categories.js`); and compares a hash of each icon's default SVG (radius 2, regular) with `tests/__snapshots__/icons.json`.
- When you change an icon or the engine on purpose, the snapshot test lists the icons whose output changed. Check them in the preview site, then run `pnpm test -u` to update the snapshot and commit it with your change.
- `pnpm audit:icons` runs `audit:grid`, `audit:caps` and `audit:crowd` against the known issues recorded in `scripts/audit-{grid,caps,crowd}.baseline.json` and fails only on new ones. Fix the geometry; if an issue is accepted, record it with `pnpm audit:icons --update-baseline` (or one audit, e.g. `node scripts/audit-crowd.mjs --update-baseline`) and commit the baseline. Each audit also takes `--max <n>`.

### Releasing

Releases are published from GitHub Actions with npm trusted publishing, only when a `v*` tag is pushed. The workflow checks that the tag matches both package versions, runs the tests and audits, dry-runs `npm publish` for both packages before publishing either, and then creates a GitHub Release whose notes list the added, redrawn, removed and renamed icons.

1. `node scripts/version.mjs 0.6.0` sets the version in both `packages/*/package.json`.
2. `pnpm brand` refreshes the banner, OG image and icon count.
3. `node scripts/release-notes.mjs --title v0.6.0 --changelog` adds the icon changes since the last tag to `CHANGELOG.md`.
4. `pnpm test && pnpm audit:icons`, then commit.
5. `git tag v0.6.0 && git push origin main v0.6.0`.

`node scripts/release-notes.mjs v0.4.0 v0.5.0` prints the notes between any two tags.

## License

[MIT](LICENSE), covering the library code and the original icons. Some icons refer to or depict third-party characters, logos and marks (Chiikawa characters, content rating marks, Creative Commons symbols, GitHub and programming language logos, game controller buttons, license names). They are fan art or nominative references: their rights stay with their owners, and the MIT license grants no rights to them. See [NOTICE](NOTICE). These icons are planned to move to a separate entry of `@jannchie/icons` in 1.0.

## Framework packages

| Package | For |
|---|---|
| [`@jannchie/icons-vue`](packages/vue) | Vue 3: `<JIcon :icon="IconHeart" />` with app-wide defaults (`app.use(JIconPlugin, { radius: 'sharp' })`), pixel hinting and SSR |
| [`@jannchie/icons-react`](packages/react) | React 18+: `<JIcon icon={IconHeart} />` with `<IconProvider>` defaults, pixel hinting and SSR |
| [`@jannchie/icons-svg`](packages/svg) | Plain SVG files and sprites (`<use href="sprite.svg#heart">`) in the default, bold and sharp styles |

`pnpm build:components` builds them from `packages/core/dist` (`pnpm build:packages` runs it after the core build); their versions follow `packages/core/package.json`.
