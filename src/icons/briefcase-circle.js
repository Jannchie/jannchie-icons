import { plain, center, centerScale } from '../briefcase'
import { ring } from '../symbols'

// 公文包 + 圆
export default ({ radius }) => [
  ...plain(radius),
  ...ring(center, centerScale, radius),
]
