import { plain, center, centerScale } from '../briefcase'
import { minus } from '../symbols'

// 公文包 + 减号
export default ({ radius }) => [
  ...plain(radius),
  ...minus(center, centerScale, radius),
]
