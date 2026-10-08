import { center, centerScale, plain } from '../shield'
import { arrowLeft, visual } from '../symbols'
import { info } from '../tone'

// 盾 + 左箭头；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...info(arrowLeft(center, centerScale * visual.arrowLeft, radius)),
]
