import { base, center, centerScale } from '../calendar'
import { clock } from '../symbols'
import { info } from '../tone'

// 日历 + 时钟
export default ({ radius }) => [
  ...base(radius),
  ...info(clock(center, centerScale, radius)),
]
