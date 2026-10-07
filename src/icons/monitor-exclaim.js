import { plain, center, centerScale } from '../monitor'
import { exclaim } from '../symbols'
import { warning } from '../tone'

// 显示器 + 感叹号
export default ({ radius }) => [
  ...plain(radius),
  ...warning(exclaim(center, centerScale, radius)),
]
