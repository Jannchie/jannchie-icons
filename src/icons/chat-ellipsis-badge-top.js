import { withBadgeTop } from '../chat'
import { ellipsis } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角省略号
export default ({ radius, stroke }) => withBadgeTop('ellipsis', ellipsis, accent, radius, stroke)
