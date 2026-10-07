import { plain, center, centerScale } from '../monitor'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 显示器 + 拼图（模组）
export default ({ radius }) => [
  ...plain(radius),
  ...accent(puzzle(center, centerScale, radius)),
]
