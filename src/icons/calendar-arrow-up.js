import { base, center, centerScale } from '../calendar'
import { arrowUp } from '../symbols'

// 日历 + 上箭头
export default ({ radius }) => [
  ...base(radius),
  ...arrowUp(center, centerScale, radius),
]
