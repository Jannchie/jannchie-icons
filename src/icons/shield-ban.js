import { ban, shield } from '../symbols'
import { danger } from '../tone'

// 盾 + 禁止；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...danger(ban([12, 11.25], 1, radius)),
]
