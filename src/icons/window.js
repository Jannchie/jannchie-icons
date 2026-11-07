import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, spans, tile } from '../solid'

// 窗口：外框 + 标题栏分隔线 + 三个小圆点
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)),
  'M3.5 8.5H20.5',
  ...[6, 8.5, 11].map(x => dot(x, 6.5, 1.5)),
]

// 实心：标题栏和窗口主体各画一块独立的圆角块（见 solid.js 的 tile），中间留 GAP 的缝；
// 标题栏只有 4 高，圆角最多 0.5；三个小圆点挖空，放在标题栏实心部分的正中
export const fill = ({ radius, stroke }) => {
  const [[x0, x1]] = spans(3.5, 20.5, [], stroke)
  const [[y0, y1], [y2, y3]] = spans(4.5, 19.5, [8.5], stroke)
  return [
    tile([x0, y0, x1, y1], Math.min(radius, 0.5)),
    tile([x0, y2, x1, y3], Math.min(radius, 2.5)),
    knock([6, 8.5, 11].map(x => dot(x, (y0 + y1) / 2, 1.5))),
  ]
}
