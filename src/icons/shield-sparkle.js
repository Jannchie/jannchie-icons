import { center, centerScale, plain } from '../shield'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 盾 + 星芒；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(sparkle(center, centerScale, radius)),
]
