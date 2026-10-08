import { center, centerScale, plain } from '../shield'
import { arrowUp, visual } from '../symbols'
import { info } from '../tone'

// 盾 + 上箭头；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...info(arrowUp(center, centerScale * visual.arrowUp, radius)),
]
