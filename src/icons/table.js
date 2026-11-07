import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 表格：外框 + 表头横线、中间横线 + 左列竖线
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M3.5 9.5H20.5',
  'M3.5 14.5H20.5',
  'M9.5 4.5V19.5',
]

// 实心：六个格子各画一块独立的圆角块（见 solid.js 的 tile），格子之间留 GAP 的缝；
// 格子只有 5 高，圆角最多 0.5（用外框的圆角会圆成一团）
export const fill = ({ radius, stroke }) => {
  const cols = spans(3.5, 20.5, [9.5], stroke)
  return spans(4.5, 19.5, [9.5, 14.5], stroke).flatMap(([y0, y1]) => cols.map(([x0, x1]) => tile([x0, y0, x1, y1], Math.min(radius, 0.5))))
}
