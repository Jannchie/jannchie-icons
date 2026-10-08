import { withBadgeTop } from '../calendar'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 日历 + 右上角右箭头
export default ({ radius, stroke }) => withBadgeTop('arrowRight', arrowRight, info, radius, stroke)
