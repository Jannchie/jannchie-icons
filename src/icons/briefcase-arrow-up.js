import { plain, center, centerScale } from '../briefcase'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 公文包 + 上箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowUp(center, centerScale, radius)),
]
