import { base, center, centerScale } from '../calendar'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 日历 + 星芒
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(sparkle(center, centerScale, radius)),
]
