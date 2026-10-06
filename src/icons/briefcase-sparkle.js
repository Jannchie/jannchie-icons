import { plain, center, centerScale } from '../briefcase'
import { sparkle } from '../symbols'

// 公文包 + 星芒
export default ({ radius }) => [
  ...plain(radius),
  ...sparkle(center, centerScale, radius),
]
