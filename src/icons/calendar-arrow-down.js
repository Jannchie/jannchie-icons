import { base, center, centerScale } from '../calendar'
import { arrowDown, visual } from '../symbols'
import { info } from '../tone'

// 日历 + 下箭头
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...info(arrowDown(center, centerScale * visual.arrowDown, radius)),
]
