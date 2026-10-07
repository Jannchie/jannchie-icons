import { base, center, centerScale } from '../calendar'
import { check } from '../symbols'
import { success } from '../tone'

// 日历 + 勾
export default ({ radius }) => [
  ...base(radius),
  ...success(check(center, centerScale, radius)),
]
