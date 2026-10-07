import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { image } from '../symbols'
import { accent } from '../tone'

// 对话 + 图片
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...accent(image(center, 1, radius)),
]
