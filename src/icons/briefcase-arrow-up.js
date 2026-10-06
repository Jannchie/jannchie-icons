import { plain, center, centerScale } from '../briefcase'
import { arrowUp } from '../symbols'

// 公文包 + 上箭头
export default ({ radius }) => [
  ...plain(radius),
  ...arrowUp(center, centerScale, radius),
]
