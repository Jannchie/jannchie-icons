import { center, centerScale, plain } from '../monitor'
import { shield } from '../symbols'
import { success } from '../tone'

// 显示器 + 盾
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...success(shield(center, centerScale, radius)),
]
