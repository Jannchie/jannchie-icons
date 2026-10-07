import { base, center, centerScale } from '../calendar'
import { plus } from '../symbols'
import { success } from '../tone'

// 日历 + 加号
export default ({ radius }) => [
  ...base(radius),
  ...success(plus(center, centerScale, radius)),
]
