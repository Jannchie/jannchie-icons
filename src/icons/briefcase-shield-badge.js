import { withBadge } from '../briefcase'
import { shield } from '../symbols'
import { success } from '../tone'

// 公文包 + 右下角盾
export default ({ radius, stroke }) => withBadge('shield', shield, success, radius, stroke)
