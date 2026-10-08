import { withBadge } from '../chat'
import { code } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角代码
export default ({ radius, stroke }) => withBadge('code', code, accent, radius, stroke)
