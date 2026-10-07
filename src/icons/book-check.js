import { plain, center, centerScale } from '../book'
import { check } from '../symbols'
import { success } from '../tone'

// 书 + 勾
export default ({ radius }) => [
  ...plain(radius),
  ...success(check(center, centerScale, radius)),
]
