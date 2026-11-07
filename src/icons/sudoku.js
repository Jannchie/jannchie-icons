import { rounded } from '../geometry'
import { glyph, LABEL } from '../letters'
import { knock, spans, tile } from '../solid'

// 数独：方框 + 井字分成九格（格线落在 .5 上，三列宽 5 / 7 / 5）+ 中间一格填好的数字
// 5–6 宽的格子在常规字重下装不下认得出的数字（数字要和格线隔开 0.5），只在最宽的中间格放一个：
// 数字高 3（0.5 倍），离四周格线的中心线都是 2：常规下留 0.7、粗字重下留 0.3 的缝
const S = 0.5
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 1.5)),
  'M8.5 3.5V20.5',
  'M15.5 3.5V20.5',
  'M3.5 8.5H20.5',
  'M3.5 15.5H20.5',
  { d: glyph('5', 12 - 1.75 * S, 12 - 3 * S, S, S, LABEL), thin: true },
]

// 实心：九个独立的方块（见 solid.js 的 tile），块和块之间留 GAP 的缝，中间一格挖出数字；
// 格子只有 5–7 见方，圆角最多 0.5（和 tetromino 一样）
export const fill = ({ radius, stroke }) => {
  const cells = spans(3.5, 20.5, [8.5, 15.5], stroke)
  const k = Math.min(radius, 0.5)
  return [
    ...cells.flatMap(([y0, y1]) => cells.map(([x0, x1]) => tile([x0, y0, x1, y1], k))),
    knock({ d: glyph('5', 12 - 1.75 * S, 12 - 3 * S, S, S, LABEL), thin: true }),
  ]
}
