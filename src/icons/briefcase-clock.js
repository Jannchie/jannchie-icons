import { plain, center, centerScale } from '../briefcase'
import { clock } from '../symbols'

// 公文包 + 时钟
export default ({ radius }) => [
  ...plain(radius),
  ...clock(center, centerScale, radius),
]
