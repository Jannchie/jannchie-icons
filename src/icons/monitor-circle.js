import { center, centerScale, plain } from '../monitor'
import { ring, visual } from '../symbols'
import { accent } from '../tone'

// 显示器 + 圆
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(ring(center, centerScale * visual.ring, radius)),
]
