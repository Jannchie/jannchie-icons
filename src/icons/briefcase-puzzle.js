import { plain, center, centerScale } from '../briefcase'
import { puzzle } from '../symbols'

// 公文包 + 拼图（模组）
export default ({ radius }) => [
  ...plain(radius),
  ...puzzle(center, centerScale, radius),
]
