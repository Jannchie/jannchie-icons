import { plain, center, centerScale } from '../monitor'
import { image } from '../symbols'
import { accent } from '../tone'

// 显示器 + 图片
export default ({ radius }) => [
  ...plain(radius),
  ...accent(image(center, centerScale, radius)),
]
