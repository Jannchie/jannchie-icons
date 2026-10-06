import { check, shield } from '../symbols'

// 盾 + 勾；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...check([12, 11.25], 1, radius),
]
