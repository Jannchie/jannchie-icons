import { plain, center, centerScale } from '../monitor'
import { ring } from '../symbols'
import { accent } from '../tone'

// 显示器 + 圆
export default ({ radius }) => [
  ...plain(radius),
  ...accent(ring(center, centerScale, radius)),
]
