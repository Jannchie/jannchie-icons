import { center, centerScale, plain } from '../shield'
import { check } from '../symbols'
import { success } from '../tone'

// 盾 + 勾；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...success(check(center, centerScale, radius)),
]
