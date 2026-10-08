import { withBadgeTop } from '../chat'
import { ring } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角圆
export default ({ radius, stroke }) => withBadgeTop('ring', ring, accent, radius, stroke)
