import { plain, center, centerScale } from '../book'
import { image } from '../symbols'
import { accent } from '../tone'

// 书 + 图片
export default ({ radius }) => [
  ...plain(radius),
  ...accent(image(center, centerScale, radius)),
]
