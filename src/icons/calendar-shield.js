import { base, center, centerScale } from '../calendar'
import { shield } from '../symbols'
import { success } from '../tone'

// 日历 + 盾
export default ({ radius }) => [
  ...base(radius),
  ...success(shield(center, centerScale, radius)),
]
