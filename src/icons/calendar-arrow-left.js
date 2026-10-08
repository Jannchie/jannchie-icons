import { base, center, centerScale } from '../calendar'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 日历 + 左箭头
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...info(arrowLeft(center, centerScale, radius)),
]
