import { plain, center, centerScale } from '../briefcase'
import { arrowLeft } from '../symbols'

// 公文包 + 左箭头
export default ({ radius }) => [
  ...plain(radius),
  ...arrowLeft(center, centerScale, radius),
]
