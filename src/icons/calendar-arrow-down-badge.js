import { withBadge } from '../calendar'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 日历 + 右下角下箭头
export default ({ radius, stroke }) => withBadge('arrowDown', arrowDown, info, radius, stroke)
