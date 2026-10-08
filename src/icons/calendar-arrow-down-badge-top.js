import { withBadgeTop } from '../calendar'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 日历 + 右上角下箭头
export default ({ radius, stroke }) => withBadgeTop('arrowDown', arrowDown, info, radius, stroke)
