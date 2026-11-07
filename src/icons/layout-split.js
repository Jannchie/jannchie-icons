import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 左右分屏：外框 + 中间竖线（竖线落在 12 上）
export default ({ radius }) => [rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)), 'M12 4.5V19.5']

// 实心：左右两块各画一块独立的圆角块（见 solid.js 的 tile），中间留 GAP 的缝，圆角最多 1.5（用外框的 2.5 会圆成胶囊）
export const fill = ({ radius, stroke }) => {
  const [[y0, y1]] = spans(4.5, 19.5, [], stroke)
  return spans(3, 21, [12], stroke).map(([x0, x1]) => tile([x0, y0, x1, y1], Math.min(radius, 1.5)))
}
