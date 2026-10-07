import { arrowDown, shield } from '../symbols'
import { info } from '../tone'

// 盾 + 下箭头；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...info(arrowDown([12, 11.25], 1, radius)),
]
