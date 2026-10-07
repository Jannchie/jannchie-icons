import { base, center, centerScale } from '../calendar'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 日历 + 上箭头
export default ({ radius }) => [
  ...base(radius),
  ...info(arrowUp(center, centerScale, radius)),
]
