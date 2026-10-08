import { plain, center, centerScale } from '../briefcase'
import { clock } from '../symbols'
import { info } from '../tone'

// 公文包 + 时钟
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(clock(center, centerScale, radius)),
]
