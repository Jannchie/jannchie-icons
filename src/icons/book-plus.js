import { plain, center, centerScale } from '../book'
import { plus } from '../symbols'
import { success } from '../tone'

// 书 + 加号
export default ({ radius }) => [
  ...plain(radius),
  ...success(plus(center, centerScale, radius)),
]
