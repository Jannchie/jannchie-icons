import { center, centerScale, plain } from '../monitor'
import { star, visual } from '../symbols'
import { warning } from '../tone'

// 显示器 + 收藏
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...warning(star(center, centerScale * visual.star, radius)),
]
