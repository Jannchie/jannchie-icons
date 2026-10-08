import { center, centerScale, plain } from '../shield'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 盾 + 拼图（模组）；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(puzzle(center, centerScale, radius)),
]
