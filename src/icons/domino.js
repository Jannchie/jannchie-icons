import { rounded } from '../geometry'
import { dot } from '../scene'

// 多米诺骨牌：竖长圆角牌 + 中间分隔线 + 上半两点、下半三点（斜排）
export default ({ radius }) => [
  rounded([[7.5, 2.5], [16.5, 2.5], [16.5, 20.5], [7.5, 20.5]], Math.min(radius, 2)),
  'M7.5 11.5H16.5',
  dot(10, 5, 2.5),
  dot(14, 9, 2.5),
  dot(9.75, 13.75, 2.5),
  dot(12, 16, 2.5),
  dot(14.25, 18.25, 2.5),
]
