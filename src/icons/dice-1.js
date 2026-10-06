import { square } from '../marks'
import { dot } from '../scene'

// 骰子 1 点：圆角方块 + 1 个点（点位间距 4.25）
export default ({ radius }) => [
  square(radius),
  dot(12.0, 12.0, 3),
]
