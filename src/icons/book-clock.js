import { plain, center, centerScale } from '../book'
import { clock, visual } from '../symbols'
import { info } from '../tone'

// 书 + 时钟
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(clock(center, centerScale * visual.clock, radius)),
]
