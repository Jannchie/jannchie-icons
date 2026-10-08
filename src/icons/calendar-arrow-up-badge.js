import { withBadge } from '../calendar'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 日历 + 右下角上箭头
export default ({ radius, stroke }) => withBadge('arrowUp', arrowUp, info, radius, stroke)
