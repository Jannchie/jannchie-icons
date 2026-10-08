import { base, center, centerScale } from '../calendar'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 日历 + 右箭头
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...info(arrowRight(center, centerScale, radius)),
]
