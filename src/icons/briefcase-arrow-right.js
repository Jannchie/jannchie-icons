import { plain, center, centerScale } from '../briefcase'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 公文包 + 右箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowRight(center, centerScale, radius)),
]
