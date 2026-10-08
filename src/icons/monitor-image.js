import { center, centerScale, plain } from '../monitor'
import { image } from '../symbols'
import { accent } from '../tone'

// 显示器 + 图片
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(image(center, centerScale, radius)),
]
