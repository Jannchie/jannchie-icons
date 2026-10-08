import { center, centerScale, plain } from '../shield'
import { star, visual } from '../symbols'
import { warning } from '../tone'

// 盾 + 收藏；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...warning(star(center, centerScale * visual.star, radius)),
]
