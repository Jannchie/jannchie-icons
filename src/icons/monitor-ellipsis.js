import { center, centerScale, plain } from '../monitor'
import { ellipsis } from '../symbols'
import { accent } from '../tone'

// 显示器 + 省略号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(ellipsis(center, centerScale, radius)),
]
