import { withBadge } from '../chat'
import { minus } from '../symbols'
import { danger } from '../tone'

// 对话 + 右下角减号
export default ({ radius, stroke }) => withBadge('minus', minus, danger, radius, stroke)
