import { base, center, centerScale } from '../calendar'
import { ban, visual } from '../symbols'
import { danger } from '../tone'

// 日历 + 禁止
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...danger(ban(center, centerScale * visual.ban, radius)),
]
