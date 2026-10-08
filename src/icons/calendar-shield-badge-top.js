import { withBadgeTop } from '../calendar'
import { shield } from '../symbols'
import { success } from '../tone'

// 日历 + 右上角盾
export default ({ radius, stroke }) => withBadgeTop('shield', shield, success, radius, stroke)
