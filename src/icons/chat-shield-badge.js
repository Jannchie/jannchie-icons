import { withBadge } from '../chat'
import { shield } from '../symbols'
import { success } from '../tone'

// 对话 + 右下角盾
export default ({ radius, stroke }) => withBadge('shield', shield, success, radius, stroke)
