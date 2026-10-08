import { withBadgeTop } from '../chat'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角下箭头
export default ({ radius, stroke }) => withBadgeTop('arrowDown', arrowDown, info, radius, stroke)
