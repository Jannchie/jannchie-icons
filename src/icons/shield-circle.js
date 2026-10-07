import { ring, shield } from '../symbols'
import { accent } from '../tone'

// 盾 + 圆；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...accent(ring([12, 11.25], 1, radius)),
]
