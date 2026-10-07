import { plain, center, centerScale } from '../briefcase'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 公文包 + 拼图（模组）
export default ({ radius }) => [
  ...plain(radius),
  ...accent(puzzle(center, centerScale, radius)),
]
