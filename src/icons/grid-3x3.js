import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 九宫格：外框 + 两横两竖；外框 3–21（边长 18、每格 6），居中
export default ({ radius }) => [
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2.5)),
  'M9 3V21',
  'M15 3V21',
  'M3 9H21',
  'M3 15H21',
]

// 实心：九个独立的方块（见 solid.js 的 tile），块和块之间留 GAP 的缝；外缘和描边版的墨迹一致。
// 格子只有 6 见方，圆角最多 0.5（和 tetromino 一样，按外框的 2.5 会圆成一团）
export const fill = ({ radius, stroke }) => {
  const cells = spans(3, 21, [9, 15], stroke)
  const k = Math.min(radius, 0.5)
  return cells.flatMap(([y0, y1]) => cells.map(([x0, x1]) => tile([x0, y0, x1, y1], k)))
}
