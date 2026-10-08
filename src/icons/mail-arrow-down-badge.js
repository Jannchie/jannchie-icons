import { withBadge } from '../mail'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角下箭头
export default ({ radius, stroke }) => withBadge('arrowDown', arrowDown, info, radius, stroke)
