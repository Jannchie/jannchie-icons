import { plain, center, centerScale } from '../briefcase'
import { plus } from '../symbols'
import { success } from '../tone'

// 公文包 + 加号
export default ({ radius }) => [
  ...plain(radius),
  ...success(plus(center, centerScale, radius)),
]
