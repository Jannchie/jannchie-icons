import { arrowDown, shield } from '../symbols'

// 盾 + 下箭头；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...arrowDown([12, 11.25], 1, radius),
]
