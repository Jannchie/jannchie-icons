import { base, center, centerScale } from '../calendar'
import { arrowLeft } from '../symbols'

// 日历 + 左箭头
export default ({ radius }) => [
  ...base(radius),
  ...arrowLeft(center, centerScale, radius),
]
