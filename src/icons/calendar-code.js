import { base, center, centerScale } from '../calendar'
import { code } from '../symbols'
import { accent } from '../tone'

// 日历 + 代码
export default ({ radius }) => [
  ...base(radius),
  ...accent(code(center, centerScale, radius)),
]
