import { plain, center, centerScale } from '../briefcase'
import { check } from '../symbols'
import { success } from '../tone'

// 公文包 + 勾
export default ({ radius }) => [
  ...plain(radius),
  ...success(check(center, centerScale, radius)),
]
