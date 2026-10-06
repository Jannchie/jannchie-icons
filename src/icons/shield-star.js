import { shield, star } from '../symbols'

// 盾 + 收藏；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...star([12, 11.25], 1, radius),
]
