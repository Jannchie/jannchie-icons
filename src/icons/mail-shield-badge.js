import { withBadge } from '../mail'
import { shield } from '../symbols'
import { success } from '../tone'

// 邮件 + 右下角盾
export default ({ radius, stroke }) => withBadge('shield', shield, success, radius, stroke)
