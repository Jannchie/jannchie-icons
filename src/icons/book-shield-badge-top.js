import { withBadgeTop } from '../book'
import { shield } from '../symbols'
import { success } from '../tone'

// 书 + 右上角盾
export default ({ radius, stroke }) => withBadgeTop('shield', shield, success, radius, stroke)
