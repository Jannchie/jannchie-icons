import { center, centerScale, plain } from '../shield'
import { ring } from '../symbols'
import { accent } from '../tone'

// 盾 + 圆；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(ring(center, centerScale, radius)),
]
