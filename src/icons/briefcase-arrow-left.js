import { plain, center, centerScale } from '../briefcase'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 公文包 + 左箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowLeft(center, centerScale, radius)),
]
