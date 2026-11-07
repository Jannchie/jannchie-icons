import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 堆叠柱状图：底线 + 三根空心方柱，每根中间一道分层线
// 柱宽 3、间距 3，柱边和横线都在 .5 上：[左边, 柱顶, 分层线]
const bars = [[4.5, 11.5, 15.5], [10.5, 5.5, 12.5], [16.5, 8.5, 14.5]]

export default ({ radius }) => [
  'M3 20.5H21',
  ...bars.map(([x, top]) => rounded([[x, 20.5], [x, top], [x + 3, top], [x + 3, 20.5]], Math.min(radius, 1), false)),
  ...bars.map(([x, , y]) => `M${x} ${y}H${x + 3}`),
]

// 实心：每根柱的上下两层各一块（见 solid.js 的 tile），两层之间留 GAP 的缝，每块四个角都收圆；
// 下层的底和底线连成一体，底线照旧是线
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  const k = Math.min(radius, 1)
  return [
    'M3 20.5H21',
    ...bars.flatMap(([x, top, y]) => spans(top, 20.5, [y], stroke).map(([y0, y1]) => tile([x - h, y0, x + 3 + h, y1], k))),
  ]
}
