import { withBadge } from '../calendar'
import { shield } from '../symbols'
import { success } from '../tone'

// 日历 + 右下角盾
export default ({ radius, stroke }) => withBadge('shield', shield, success, radius, stroke)
