import { lock, shield } from '../symbols'
import { warning } from '../tone'

// 盾 + 锁；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...warning(lock([12, 11.25], 1, radius)),
]
