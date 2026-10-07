import { base, center, centerScale } from '../calendar'
import { plug } from '../symbols'
import { accent } from '../tone'

// 日历 + 插头
export default ({ radius }) => [
  ...base(radius),
  ...accent(plug(center, centerScale, radius)),
]
