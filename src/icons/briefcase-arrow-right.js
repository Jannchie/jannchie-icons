import { plain, center, centerScale } from '../briefcase'
import { arrowRight } from '../symbols'

// 公文包 + 右箭头
export default ({ radius }) => [
  ...plain(radius),
  ...arrowRight(center, centerScale, radius),
]
