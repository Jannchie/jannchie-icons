import { base, center, centerScale } from '../calendar'
import { code } from '../symbols'

// 日历 + 代码
export default ({ radius }) => [
  ...base(radius),
  ...code(center, centerScale, radius),
]
