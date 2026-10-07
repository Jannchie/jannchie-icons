import { plain, center, centerScale } from '../monitor'
import { minus } from '../symbols'
import { danger } from '../tone'

// 显示器 + 减号
export default ({ radius }) => [
  ...plain(radius),
  ...danger(minus(center, centerScale, radius)),
]
