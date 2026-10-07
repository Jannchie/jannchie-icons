import { plain, center, centerScale } from '../briefcase'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 公文包 + 下箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowDown(center, centerScale, radius)),
]
