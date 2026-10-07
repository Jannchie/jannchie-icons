import { plain, center, centerScale } from '../briefcase'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 公文包 + 右箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowRight(center, centerScale, radius)),
]
