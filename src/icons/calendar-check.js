import { base, center, centerScale } from '../calendar'
import { check } from '../symbols'

// 日历 + 勾
export default ({ radius }) => [
  ...base(radius),
  ...check(center, centerScale, radius),
]
