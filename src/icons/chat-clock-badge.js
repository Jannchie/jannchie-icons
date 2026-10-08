import { withBadge } from '../chat'
import { clock } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角时钟
export default ({ radius, stroke }) => withBadge('clock', clock, info, radius, stroke)
