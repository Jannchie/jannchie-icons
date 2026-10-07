import { plain, center, centerScale } from '../monitor'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 显示器 + 星芒
export default ({ radius }) => [
  ...plain(radius),
  ...accent(sparkle(center, centerScale, radius)),
]
