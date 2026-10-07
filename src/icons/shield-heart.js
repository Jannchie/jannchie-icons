import { shield, heart } from '../symbols'
import { danger } from '../tone'

// 盾 + 爱心；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...danger(heart([12, 11.25], 1, radius)),
]
