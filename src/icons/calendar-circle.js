import { base, center, centerScale } from '../calendar'
import { ring } from '../symbols'
import { accent } from '../tone'

// 日历 + 圆
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(ring(center, centerScale, radius)),
]
