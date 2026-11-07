import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 三栏：外框 + 两道竖线，三栏等宽
export default ({ radius }) => [rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)), 'M9 4.5V19.5', 'M15 4.5V19.5']

// 实心：三栏各画一块独立的圆角块（见 solid.js 的 tile），栏和栏之间留 GAP 的缝；
// 每栏只有 6 宽，圆角最多 0.5（用外框的 2.5 会圆成两头圆的长条）
export const fill = ({ radius, stroke }) => {
  const [[y0, y1]] = spans(4.5, 19.5, [], stroke)
  return spans(3, 21, [9, 15], stroke).map(([x0, x1]) => tile([x0, y0, x1, y1], Math.min(radius, 0.5)))
}
