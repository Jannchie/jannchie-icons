import { plain, center, centerScale } from '../monitor'
import { shield } from '../symbols'
import { success } from '../tone'

// 显示器 + 盾
export default ({ radius }) => [
  ...plain(radius),
  ...success(shield(center, centerScale, radius)),
]
