import { plain, center, centerScale } from '../briefcase'
import { image } from '../symbols'
import { accent } from '../tone'

// 公文包 + 图片
export default ({ radius }) => [
  ...plain(radius),
  ...accent(image(center, centerScale, radius)),
]
