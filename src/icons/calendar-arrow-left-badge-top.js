import { withBadgeTop } from '../calendar'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 日历 + 右上角左箭头
export default ({ radius, stroke }) => withBadgeTop('arrowLeft', arrowLeft, info, radius, stroke)
