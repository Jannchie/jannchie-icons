import { base, center, centerScale } from '../calendar'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 日历 + 拼图（模组）
export default ({ radius }) => [
  ...base(radius),
  ...accent(puzzle(center, centerScale, radius)),
]
