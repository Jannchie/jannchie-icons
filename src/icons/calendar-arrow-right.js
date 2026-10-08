import { base, center, centerScale } from '../calendar'
import { arrowRight, visual } from '../symbols'
import { info } from '../tone'

// 日历 + 右箭头
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...info(arrowRight(center, centerScale * visual.arrowRight, radius)),
]
