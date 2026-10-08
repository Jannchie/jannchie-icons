import { rounded } from '../geometry'
import { dot } from '../scene'

// 多米诺骨牌：竖长圆角牌 + 中间分隔线 + 上半两点、下半三点（斜排）
export default ({ radius }) => [
  rounded([[7.5, 3], [16.5, 3], [16.5, 21], [7.5, 21]], Math.min(radius, 2)),
  'M7.5 12H16.5',
  dot(10, 5.5, 2.5),
  dot(14, 9.5, 2.5),
  dot(9.75, 14.25, 2.5),
  dot(12, 16.5, 2.5),
  dot(14.25, 18.75, 2.5),
]
