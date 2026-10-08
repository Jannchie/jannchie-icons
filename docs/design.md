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

## Checking

- `node --import <scratchpad>/ext-register.mjs <scratchpad>/margins2.mjs` (see the maintainers' notes) lists the ink margins of every icon.
- `pnpm audit:icons` runs the grid, cap and crowding audits against their baselines.
