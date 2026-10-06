import { rounded } from '../geometry'
import { dot } from '../scene'

// 平板：较宽的机身 + 底部一个圆点
export default ({ radius }) => [
  rounded([[4, 3], [20, 3], [20, 21], [4, 21]], Math.max(Math.min(radius, 3), 2)),
  dot(12, 18),
]
