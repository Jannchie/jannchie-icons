import { square } from '../marks'
import { dot } from '../scene'

// 骰子 2 点：圆角方块 + 2 个点（点位间距 4.25）
export default ({ radius }) => [
  square(radius),
  dot(7.75, 7.75, 3),
  dot(16.25, 16.25, 3),
]
