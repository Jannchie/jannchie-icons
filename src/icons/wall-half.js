import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 半墙：wall 只砌到一半高——墙体 3.5–19.5 × 12.5–20.5，两层砖（横缝 16.5），竖缝错开（上层 11.5，下层 7.5 / 15.5）
export default ({ radius }) => [
  rounded([[3.5, 12.5], [19.5, 12.5], [19.5, 20.5], [3.5, 20.5]], Math.min(radius, 1)),
  'M3.5 16.5H19.5',
  'M11.5 12.5V16.5',
  'M7.5 16.5V20.5',
  'M15.5 16.5V20.5',
]

// 实心：一块块砖各画一块（见 solid.js 的 tile），砖和砖之间留 GAP 的缝；外缘和描边版的墨迹一致。
// 砖高只有 4，圆角最多 0.5（和 tetromino 一样）
export const fill = ({ radius, stroke }) => {
  const k = Math.min(radius, 0.5)
  const rows = spans(12.5, 20.5, [16.5], stroke)
  const joints = [[11.5], [7.5, 15.5]]
  return rows.flatMap(([y0, y1], i) => spans(3.5, 19.5, joints[i], stroke).map(([x0, x1]) => tile([x0, y0, x1, y1], k)))
}
