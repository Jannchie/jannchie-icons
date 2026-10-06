import { base, center, centerScale } from '../calendar'
import { cross } from '../symbols'

// 日历 + 叉
export default ({ radius }) => [
  ...base(radius),
  ...cross(center, centerScale, radius),
]
