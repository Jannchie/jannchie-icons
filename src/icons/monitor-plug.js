import { plain, center, centerScale } from '../monitor'
import { plug } from '../symbols'
import { accent } from '../tone'

// 显示器 + 插头
export default ({ radius }) => [
  ...plain(radius),
  ...accent(plug(center, centerScale, radius)),
]
