import { center, centerScale, plain } from '../monitor'
import { sparkle, visual } from '../symbols'
import { accent } from '../tone'

// 显示器 + 星芒
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(sparkle(center, centerScale * visual.sparkle, radius)),
]
