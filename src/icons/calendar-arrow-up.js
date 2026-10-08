import { base, center, centerScale } from '../calendar'
import { arrowUp, visual } from '../symbols'
import { info } from '../tone'

// 日历 + 上箭头
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...info(arrowUp(center, centerScale * visual.arrowUp, radius)),
]
