import { base, center, centerScale } from '../calendar'
import { star } from '../symbols'
import { warning } from '../tone'

// 日历 + 收藏
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...warning(star(center, centerScale, radius)),
]
