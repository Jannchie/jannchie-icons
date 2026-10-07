import { plain, center, centerScale } from '../monitor'
import { plus } from '../symbols'
import { success } from '../tone'

// 显示器 + 加号
export default ({ radius }) => [
  ...plain(radius),
  ...success(plus(center, centerScale, radius)),
]
