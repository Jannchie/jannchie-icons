import { plain, center, centerScale } from '../briefcase'
import { code } from '../symbols'

// 公文包 + 代码
export default ({ radius }) => [
  ...plain(radius),
  ...code(center, centerScale, radius),
]
