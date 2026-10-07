import { plain, center, centerScale } from '../monitor'
import { star } from '../symbols'
import { warning } from '../tone'

// 显示器 + 收藏
export default ({ radius }) => [
  ...plain(radius),
  ...warning(star(center, centerScale, radius)),
]
