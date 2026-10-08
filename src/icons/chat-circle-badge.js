import { withBadge } from '../chat'
import { ring } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角圆
export default ({ radius, stroke }) => withBadge('ring', ring, accent, radius, stroke)
