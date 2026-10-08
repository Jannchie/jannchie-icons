import { withBadgeTop } from '../chat'
import { clock } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角时钟
export default ({ radius, stroke }) => withBadgeTop('clock', clock, info, radius, stroke)
