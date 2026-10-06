import { base, center, centerScale } from '../calendar'
import { plus } from '../symbols'

// 日历 + 加号
export default ({ radius }) => [
  ...base(radius),
  ...plus(center, centerScale, radius),
]
