import { withBadgeTop } from '../chat'
import { lock } from '../symbols'
import { warning } from '../tone'

// 对话 + 右上角锁
export default ({ radius, stroke }) => withBadgeTop('lock', lock, warning, radius, stroke)
