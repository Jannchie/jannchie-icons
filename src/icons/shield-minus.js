import { center, centerScale, plain } from '../shield'
import { minus, visual } from '../symbols'
import { danger } from '../tone'

// 盾 + 减号；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...danger(minus(center, centerScale * visual.minus, radius)),
]
