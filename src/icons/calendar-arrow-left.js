import { base, center, centerScale } from '../calendar'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 日历 + 左箭头
export default ({ radius }) => [
  ...base(radius),
  ...info(arrowLeft(center, centerScale, radius)),
]
