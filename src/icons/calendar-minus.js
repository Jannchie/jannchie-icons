import { base, center, centerScale } from '../calendar'
import { minus } from '../symbols'
import { danger } from '../tone'

// 日历 + 减号
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...danger(minus(center, centerScale, radius)),
]
