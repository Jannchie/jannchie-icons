import { plain, center, centerScale } from '../briefcase'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 公文包 + 上箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowUp(center, centerScale, radius)),
]
