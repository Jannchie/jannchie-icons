import { image, shield } from '../symbols'
import { accent } from '../tone'

// 盾 + 图片；盾下半收窄，符号放在中心偏上
export default ({ radius }) => [
  ...shield([12, 12], 2.3, radius),
  ...accent(image([12, 11.25], 1, radius)),
]
