import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 矩形树图：方框里层层切分的矩形
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  'M12.5 3.5V20.5',
  'M3.5 12.5H12.5',
  'M12.5 9.5H20.5',
  'M16.5 9.5V20.5',
]

// 实心：每个矩形各一块（见 solid.js 的 tile），块和块之间留 GAP 的缝，每块四个角都收圆；外缘和描边版的墨迹一致
export const fill = ({ radius, stroke }) => {
  const k = Math.min(radius, 1)
  const [l, m, r] = spans(3.5, 20.5, [12.5, 16.5], stroke)
  const [top, bottom] = spans(3.5, 20.5, [12.5], stroke)
  const [head, body] = spans(3.5, 20.5, [9.5], stroke)
  return [
    [l, top],
    [l, bottom],
    [[m[0], r[1]], head],
    [m, body],
    [r, body],
  ].map(([[x0, x1], [y0, y1]]) => tile([x0, y0, x1, y1], k))
}
