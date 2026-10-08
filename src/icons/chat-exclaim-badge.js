import { withBadge } from '../chat'
import { exclaim } from '../symbols'
import { warning } from '../tone'

// 对话 + 右下角感叹号
export default ({ radius, stroke }) => withBadge('exclaim', exclaim, warning, radius, stroke)
