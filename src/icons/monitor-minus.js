import { center, centerScale, plain } from '../monitor'
import { minus } from '../symbols'
import { danger } from '../tone'

// 显示器 + 减号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(minus(center, centerScale, radius)),
]
