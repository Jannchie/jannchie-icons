import { withBadge } from '../chat'
import { plug } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角插头
export default ({ radius, stroke }) => withBadge('plug', plug, accent, radius, stroke)
