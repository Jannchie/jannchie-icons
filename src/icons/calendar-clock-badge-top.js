import { withBadgeTop } from '../calendar'
import { clock } from '../symbols'
import { info } from '../tone'

// 日历 + 右上角时钟
export default ({ radius, stroke }) => withBadgeTop('clock', clock, info, radius, stroke)
