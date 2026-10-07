import { cross, shield } from '../symbols'
import { danger } from '../tone'

// 盾 + 叉；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...danger(cross([12, 11.25], 1, radius)),
]
