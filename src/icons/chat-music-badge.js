import { withBadge } from '../chat'
import { music } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角音乐
export default ({ radius, stroke }) => withBadge('music', music, accent, radius, stroke)
