import { withBadgeTop } from '../calendar'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 日历 + 右上角上箭头
export default ({ radius, stroke }) => withBadgeTop('arrowUp', arrowUp, info, radius, stroke)
