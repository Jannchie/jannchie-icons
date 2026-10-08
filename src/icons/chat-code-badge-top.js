import { withBadgeTop } from '../chat'
import { code } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角代码
export default ({ radius, stroke }) => withBadgeTop('code', code, accent, radius, stroke)
