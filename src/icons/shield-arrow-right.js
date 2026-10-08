import { center, centerScale, plain } from '../shield'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 盾 + 右箭头；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...info(arrowRight(center, centerScale, radius)),
]
