import { withBadgeTop } from '../chat'
import { plug } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角插头
export default ({ radius, stroke }) => withBadgeTop('plug', plug, accent, radius, stroke)
