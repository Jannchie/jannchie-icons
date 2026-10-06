import { circle } from '../geometry'
import { dot } from '../scene'

// 飞镖：靶（外圈 + 中圈 + 靶心）+ 从右上斜插进靶心的飞镖（镖杆 + 尾翼）
export default ({ radius }) => [
  { d: circle(11, 13, 8.5), cut: false },
  circle(11, 13, 4.5),
  dot(11, 13, 2.5),
  { d: 'M11 13L19.5 4.5', cut: true, gap: 0.5 },
  { d: 'M19.5 4.5L19.5 2.5', cut: true, gap: 0.5 },
  { d: 'M19.5 4.5L21.5 4.5', cut: true, gap: 0.5 },
]
