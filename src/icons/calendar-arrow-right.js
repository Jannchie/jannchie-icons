import { base, center, centerScale } from '../calendar'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 日历 + 右箭头
export default ({ radius }) => [
  ...base(radius),
  ...info(arrowRight(center, centerScale, radius)),
]
