import { center, centerScale, plain } from '../shield'
import { code } from '../symbols'
import { accent } from '../tone'

// 盾 + 代码；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(code(center, centerScale, radius)),
]
