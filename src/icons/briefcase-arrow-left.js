import { plain, center, centerScale } from '../briefcase'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 公文包 + 左箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowLeft(center, centerScale, radius)),
]
