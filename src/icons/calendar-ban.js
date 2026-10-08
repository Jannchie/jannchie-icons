import { base, center, centerScale } from '../calendar'
import { ban } from '../symbols'
import { danger } from '../tone'

// 日历 + 禁止
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...danger(ban(center, centerScale, radius)),
]
