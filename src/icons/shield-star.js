import { shield, star } from '../symbols'
import { warning } from '../tone'

// 盾 + 收藏；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...warning(star([12, 11.25], 1, radius)),
]
