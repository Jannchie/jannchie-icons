import { plain, center, centerScale } from '../briefcase'
import { plug } from '../symbols'

// 公文包 + 插头
export default ({ radius }) => [
  ...plain(radius),
  ...plug(center, centerScale, radius),
]
