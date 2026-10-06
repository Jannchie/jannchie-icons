import { plain, center, centerScale } from '../briefcase'
import { image } from '../symbols'

// 公文包 + 图片
export default ({ radius }) => [
  ...plain(radius),
  ...image(center, centerScale, radius),
]
