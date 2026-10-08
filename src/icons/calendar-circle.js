import { base, center, centerScale } from '../calendar'
import { ring, visual } from '../symbols'
import { accent } from '../tone'

// 日历 + 圆
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(ring(center, centerScale * visual.ring, radius)),
]
