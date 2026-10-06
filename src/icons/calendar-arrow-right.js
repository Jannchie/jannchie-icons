import { base, center, centerScale } from '../calendar'
import { arrowRight } from '../symbols'

// 日历 + 右箭头
export default ({ radius }) => [
  ...base(radius),
  ...arrowRight(center, centerScale, radius),
]
