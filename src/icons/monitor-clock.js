import { center, centerScale, plain } from '../monitor'
import { clock, visual } from '../symbols'
import { info } from '../tone'

// 显示器 + 时钟
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(clock(center, centerScale * visual.clock, radius)),
]
