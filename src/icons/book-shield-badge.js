import { withBadge } from '../book'
import { shield } from '../symbols'
import { success } from '../tone'

// 书 + 右下角盾
export default ({ radius, stroke }) => withBadge('shield', shield, success, radius, stroke)
