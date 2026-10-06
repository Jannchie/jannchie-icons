import { plain, center, centerScale } from '../briefcase'
import { check } from '../symbols'

// 公文包 + 勾
export default ({ radius }) => [
  ...plain(radius),
  ...check(center, centerScale, radius),
]
