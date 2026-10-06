import { rounded } from '../geometry'
import { dot } from '../scene'

// 多米诺骨牌：竖长圆角牌 + 中间分隔线 + 上半两点、下半三点（斜排）
export default ({ radius }) => [
  rounded([[7, 2.5], [17, 2.5], [17, 21.5], [7, 21.5]], Math.min(radius, 2)),
  'M7 12H17',
  dot(10, 5.25, 2.5),
  dot(14, 9.25, 2.5),
  dot(9.75, 14.75, 2.5),
  dot(12, 16.75, 2.5),
  dot(14.25, 18.75, 2.5),
]
