import { center, centerScale, plain } from '../shield'
import { plus, visual } from '../symbols'
import { success } from '../tone'

// 盾 + 加号；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...success(plus(center, centerScale * visual.plus, radius)),
]
