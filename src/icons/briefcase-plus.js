import { plain, center, centerScale } from '../briefcase'
import { plus } from '../symbols'

// 公文包 + 加号
export default ({ radius }) => [
  ...plain(radius),
  ...plus(center, centerScale, radius),
]
