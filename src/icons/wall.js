import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 墙（立面，砖砌）：墙体 3.5–19.5 × 2.5–20.5（中轴 11.5，让竖缝都落在 .5 上），三层砖，层高 6（横缝 8.5 / 14.5）；
// 竖缝上下错开：第一、三层在正中（11.5），第二层在两侧（7.5 / 15.5）
export default ({ radius }) => [
  rounded([[3.5, 2.5], [19.5, 2.5], [19.5, 20.5], [3.5, 20.5]], Math.min(radius, 1)),
  'M3.5 8.5H19.5',
  'M3.5 14.5H19.5',
  'M11.5 2.5V8.5',
  'M7.5 8.5V14.5',
  'M15.5 8.5V14.5',
  'M11.5 14.5V20.5',
]

// 实心：一块块砖各画一块（见 solid.js 的 tile），砖和砖之间留 GAP 的缝；外缘和描边版的墨迹一致。
// 砖高只有 6，圆角最多 0.5（和 tetromino 一样）
export const fill = ({ radius, stroke }) => {
  const k = Math.min(radius, 0.5)
  const rows = spans(2.5, 20.5, [8.5, 14.5], stroke)
  const joints = [[11.5], [7.5, 15.5], [11.5]]
  return rows.flatMap(([y0, y1], i) => spans(3.5, 19.5, joints[i], stroke).map(([x0, x1]) => tile([x0, y0, x1, y1], k)))
}
