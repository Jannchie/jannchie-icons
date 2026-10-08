import { plain, center, centerScale } from '../briefcase'
import { arrowDown, visual } from '../symbols'
import { info } from '../tone'

// 公文包 + 下箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowDown(center, centerScale * visual.arrowDown, radius)),
]
