import { base, center, centerScale } from '../calendar'
import { arrowDown } from '../symbols'

// 日历 + 下箭头
export default ({ radius }) => [
  ...base(radius),
  ...arrowDown(center, centerScale, radius),
]
