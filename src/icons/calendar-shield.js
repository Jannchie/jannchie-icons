import { base, center, centerScale } from '../calendar'
import { shield, visual } from '../symbols'
import { success } from '../tone'

// 日历 + 盾
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...success(shield(center, centerScale * visual.shield, radius)),
]
