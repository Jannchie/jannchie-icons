import { base, center, centerScale } from '../calendar'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 日历 + 下箭头
export default ({ radius }) => [
  ...base(radius),
  ...info(arrowDown(center, centerScale, radius)),
]
