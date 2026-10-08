import { center, centerScale, plain } from '../shield'
import { heart, visual } from '../symbols'
import { danger } from '../tone'

// 盾 + 爱心；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...danger(heart(center, centerScale * visual.heart, radius)),
]
