import { center, centerScale, plain } from '../shield'
import { clock, visual } from '../symbols'
import { info } from '../tone'

// 盾 + 时钟；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...info(clock(center, centerScale * visual.clock, radius)),
]
