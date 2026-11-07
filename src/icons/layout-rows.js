import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 三行：外框（和 layout-columns 同一个 3–21 × 4.5–19.5）+ 两道横线，三行等高
export default ({ radius }) => [rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)), 'M3 9.5H21', 'M3 14.5H21']

// 实心：三行各画一块独立的圆角块（见 solid.js 的 tile），行和行之间留 GAP 的缝；
// 每行只有 5 高，圆角最多 0.5（用外框的 2.5 会圆成两头圆的长条）
export const fill = ({ radius, stroke }) => {
  const [[x0, x1]] = spans(3, 21, [], stroke)
  return spans(4.5, 19.5, [9.5, 14.5], stroke).map(([y0, y1]) => tile([x0, y0, x1, y1], Math.min(radius, 0.5)))
}
