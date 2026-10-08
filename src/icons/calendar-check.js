import { base, center, centerScale } from '../calendar'
import { check } from '../symbols'
import { success } from '../tone'

// 日历 + 勾
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...success(check(center, centerScale, radius)),
]
