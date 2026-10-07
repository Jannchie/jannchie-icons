import { plain, center, centerScale } from '../monitor'
import { code } from '../symbols'
import { accent } from '../tone'

// 显示器 + 代码
export default ({ radius }) => [
  ...plain(radius),
  ...accent(code(center, centerScale, radius)),
]
