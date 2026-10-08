import { center, centerScale, plain } from '../shield'
import { plug } from '../symbols'
import { accent } from '../tone'

// 盾 + 插头；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(plug(center, centerScale, radius)),
]
