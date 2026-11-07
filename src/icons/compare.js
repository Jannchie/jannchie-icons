import { GAP } from '../clearance'
import { circle, rounded } from '../geometry'
import { clear, solid, spans, tile } from '../solid'

// 对比：外框 + 中间分隔线（分隔线在滑块圆圈处断开）+ 圆形滑块
export default ({ radius, stroke }) => [
  // 外框 3–21，分隔线在中轴 12 上
  rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)),
  'M12 4.5V19.5',
  { d: circle(12, 12, 2.25), cut: true },
]

// 实心：左右两半各画一块独立的圆角块（见 solid.js 的 tile），中间留 GAP 的缝；滑块是实心圆，两块在它四周让出缝
export const fill = ({ radius, stroke }) => {
  const [[y0, y1]] = spans(4.5, 19.5, [], stroke)
  return [
    ...spans(3, 21, [12], stroke).map(([x0, x1]) => tile([x0, y0, x1, y1], Math.min(radius, 1.5))),
    clear(circle(12, 12, 2.25), GAP),
    solid(circle(12, 12, 2.25)),
  ]
}
