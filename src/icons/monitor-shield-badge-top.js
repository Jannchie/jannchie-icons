import { withBadgeTop } from '../monitor'
import { shield } from '../symbols'
import { success } from '../tone'

// 显示器 + 右上角盾
export default ({ radius, stroke }) => withBadgeTop('shield', shield, success, radius, stroke)
