import { plain, center, centerScale } from '../briefcase'
import { arrowDown } from '../symbols'

// 公文包 + 下箭头
export default ({ radius }) => [
  ...plain(radius),
  ...arrowDown(center, centerScale, radius),
]
