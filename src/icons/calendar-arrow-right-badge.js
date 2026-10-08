import { withBadge } from '../calendar'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 日历 + 右下角右箭头
export default ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke)
