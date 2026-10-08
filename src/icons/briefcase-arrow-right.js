import { plain, center, centerScale } from '../briefcase'
import { arrowRight, visual } from '../symbols'
import { info } from '../tone'

// 公文包 + 右箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowRight(center, centerScale * visual.arrowRight, radius)),
]
