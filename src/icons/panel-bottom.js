import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 底部面板：外框 + 下方横线
export default ({ radius }) => [rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)), 'M3.5 15.5H20.5']

// 实心：主区和底部面板各画一块独立的圆角块（见 solid.js 的 tile），中间留 GAP 的缝；
// 主区圆角和外框一样，底部面板只有 4 高，圆角最多 0.5
export const fill = ({ radius, stroke }) => {
  const [[x0, x1]] = spans(3.5, 20.5, [], stroke)
  const [[y0, y1], [y2, y3]] = spans(4.5, 19.5, [15.5], stroke)
  return [tile([x0, y0, x1, y1], Math.min(radius, 2.5)), tile([x0, y2, x1, y3], Math.min(radius, 0.5))]
}
