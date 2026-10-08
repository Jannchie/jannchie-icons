import { center, centerScale, plain } from '../shield'
import { ban } from '../symbols'
import { danger } from '../tone'

// 盾 + 禁止；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...danger(ban(center, centerScale, radius)),
]
