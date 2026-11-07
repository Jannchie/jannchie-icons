import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 上下分屏：外框 + 中间横线（外框高 16：4–20，横线落在 12 上），和左右分屏 layout-split 成对
export default ({ radius }) => [rounded([[3, 4], [21, 4], [21, 20], [3, 20]], Math.min(radius, 2.5)), 'M3 12H21']

// 实心：上下两块各画一块独立的圆角块（见 solid.js 的 tile），中间留 GAP 的缝，圆角最多 1.5（用外框的 2.5 会圆成胶囊）
export const fill = ({ radius, stroke }) => {
  const [[x0, x1]] = spans(3, 21, [], stroke)
  return spans(4, 20, [12], stroke).map(([y0, y1]) => tile([x0, y0, x1, y1], Math.min(radius, 1.5)))
}
