import { withBadge } from '../chat'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角下箭头
export default ({ radius, stroke }) => withBadge('arrowDown', arrowDown, info, radius, stroke)
