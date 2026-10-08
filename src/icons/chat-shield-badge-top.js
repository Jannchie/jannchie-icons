import { withBadgeTop } from '../chat'
import { shield } from '../symbols'
import { success } from '../tone'

// 对话 + 右上角盾
export default ({ radius, stroke }) => withBadgeTop('shield', shield, success, radius, stroke)
