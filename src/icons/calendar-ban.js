import { base, center, centerScale } from '../calendar'
import { ban } from '../symbols'
import { danger } from '../tone'

// 日历 + 禁止
export default ({ radius }) => [
  ...base(radius),
  ...danger(ban(center, centerScale, radius)),
]
