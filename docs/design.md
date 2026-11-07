# Design rules

How icons are drawn on the 24 × 24 canvas. Naming rules are in [naming.md](naming.md).

## Canvas and padding

- The canvas is 24 × 24 units. At 24 px on a 1× screen one unit is one pixel.
- Ink means the visible stroke, including half the stroke width on each side of the path.
- Keep ink at least **2 units** from every canvas edge. Content lives in the central 20 × 20 area.
- Round and diagonal shapes (circles, triangles, slanted strokes) may overshoot to **1.5 units** from the edge so they look as large as squares. Never go closer than 1.
- Center the content. If the ink box is narrower or shorter than 20, put the same space on both sides. Do not shift a shape half a unit off center only to land a centerline on a .5 coordinate.
- Use the space: every icon should reach the 2-unit padding on at least one side, so a centered drawing does not look a size smaller than its neighbors. A full square body may stop at 3 instead, because a square that fills 20 × 20 looks larger than a circle of diameter 20.
- These are a baseline, not a hard rule. Keep an exception when it has a reason, and say why in a comment:
  - small marks that are small by nature (chevrons, carets, dots, a lone minus, punctuation);
  - sign sets drawn at one shared glyph size (letters, kana, hexagrams, notation);
  - members of a family that stay the same size as the rest of the family;
  - long thin rows such as list lines, which may stop at 3.

## Stroke weights grow inward

- Weights are light 1, regular 1.5 (default) and bold 2, in canvas units.
- Fix the **outer edge** of the ink and let heavier weights grow inward. A frame whose outer edge sits at 2 has its centerline at `2 + stroke / 2`: 2.5 for light, 2.75 for regular, 3 for bold.
- Write this in the icon itself. Every draw function receives `stroke`; use `h = stroke / 2` for the offsets:

  ```js
  export default ({ stroke }) => {
    const h = stroke / 2
    return [`M${3 + h} 6H${21 - h}`] // ink from 3 to 21 at every weight
  }
  ```

- The render pipeline does not inset shapes automatically. Each icon decides which edges stay fixed and which parts (centered symbols, inner details) keep their centerlines.

## Pixel alignment

- Hinting shifts the whole icon by less than half a device pixel so that one edge of each horizontal and vertical stroke lands on the pixel grid. Stroke widths are not rounded; they only have a 0.5 px floor.
- Shapes whose outer edges sit on whole units stay sharp on both sides once hinted, because the shift needed for the left edge also fits the right edge.
- Evenly spaced rows (lists, alignment icons) share one pixel phase. Space them 6 units apart so they hit whole pixels at 16, 20 and 24 px.

## Gaps

- Leave a visible gap of at least 0.5 between strokes at regular and 0.25 at bold. `pnpm audit:icons` reports smaller gaps, but they are a hint: accept crowding that does not hurt recognition.

## Fill variant

- An icon gets a fill version by exporting `fill` next to its default export. It receives `{ radius, stroke, weight, sharp }` and returns paths like the outline, marked with the helpers in `src/solid.js`:
  - `solid(d)`: a closed area, plus half a stroke around its edge. Use the same outline path as the stroke version, so the ink edge stays where the outline's ink edge is.
  - plain paths: lines, drawn as their stroke shape (dots, `detail`, `badge` and `thin` widths work as in the outline).
  - `knock(d)`: removes the stroke shape of a line from everything drawn before it.
  - `hole(d)`: removes a closed area plus half a stroke. To get a hole as large as the inside of an outline shape, pass that shape inset by half a stroke.
- Paths apply in order: lay down the solid body, knock out the details, then add lines that should stay whole (a ground line drawn after the door hole is not cut by it).
- Draw the fill by hand from the outline's geometry, not by filling every closed path. Keep the outer silhouette of the outline; turn inner lines into knock-outs; keep parts that read as lines in the outline (eaves, handles, hanging rings) as lines.
- Separate parts cleanly. A knock-out that divides parts runs all the way through and out past the outline (`through` in `src/geometry.js` extends a segment); never stop it a stroke short inside the solid, which leaves a dead-end slot and a thin bridge. Separate objects that share edges in the outline (podium pillars, grid cells, layout panes) are drawn as separate blocks with their own corners and a `GAP` between them (`tile` and `spans` in `src/solid.js`). A face in front keeps its whole shape and the part behind clears a `GAP` around it (`stacked`, e.g. a cylinder's top ellipse). Where a gap meets a slanted edge, cut it parallel to the edge with an exact region (`cutout`).
- A knocked-out line that runs into the outer edge splits the shape. Stop it one stroke short of the edge when the parts should stay connected (the calendar header line).
- Corners that are features of the shape (a speech-bubble tail) keep their small fixed radius (`crisp`), as in the outline.
- Series (folder, file, chat, mail, calendar, monitor, book, briefcase, shield) define their fill once, as `fillParts(radius, stroke)` in the series module: `body` is the solid shape with its knock-outs, `lines` are parts that stay whole (hanging rings, the monitor stand, the briefcase handle) and are drawn last. Icons in a series use the helpers in `src/solid.js`:
  - `plainFill(parts)` for the plain icon;
  - `centerFill(parts, symbol)` for a centered symbol, which is knocked out of the body;
  - `withBadge(…, { fill: true })` / `withBadgeTop(…, { fill: true })` for a corner badge: same placement as the outline, the body clears a `GAP` around the badge (`clear`: closed parts of the badge are cleared with their inside), then the badge is drawn as lines. `badgeFill` also takes the corner (`'bottom'` or `'top'`): the cleared area is swept toward that outer corner, so toward the body the badge reads as a thin outline, and no thin strip of body is left between the badge and the outer edge.
- `-off` icons use `offFill(baseFill)` from `src/off.js`: the base fill clears a `GAP` on both sides of the slash, then the slash is drawn.
- `src/fill.js` computes the result with Clipper2 and fits arcs and cubic curves back into the polyline output. The preview site computes it live; the published package carries precomputed path data in the `@jannchie/icons/fill` entry, so the package does not depend on Clipper2 and outline-only bundles do not carry fill data. `pnpm test` checks that every fill renders at all 15 settings and that the fitted path stays on the computed outline.

## Checking

- `node --import <scratchpad>/ext-register.mjs <scratchpad>/margins2.mjs` (see the maintainers' notes) lists the ink margins of every icon.
- `pnpm audit:icons` runs the grid, cap and crowding audits against their baselines.
