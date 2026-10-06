import { base, center, centerScale } from '../calendar'
import { plug } from '../symbols'

// 日历 + 插头
export default ({ radius }) => [
  ...base(radius),
  ...plug(center, centerScale, radius),
]
