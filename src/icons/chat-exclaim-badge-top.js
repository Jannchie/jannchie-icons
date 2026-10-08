import { withBadgeTop } from '../chat'
import { exclaim } from '../symbols'
import { warning } from '../tone'

// 对话 + 右上角感叹号
export default ({ radius, stroke }) => withBadgeTop('exclaim', exclaim, warning, radius, stroke)
