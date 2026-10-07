import { assets, shield } from '../symbols'
import { accent } from '../tone'

// 盾 + 素材；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...accent(assets([12, 11.25], 1, radius)),
]
