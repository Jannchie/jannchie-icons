import { plain, center, centerScale } from '../monitor'
import { ellipsis } from '../symbols'
import { accent } from '../tone'

// 显示器 + 省略号
export default ({ radius }) => [
  ...plain(radius),
  ...accent(ellipsis(center, centerScale, radius)),
]
