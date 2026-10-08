import { withBadge } from '../calendar'
import { clock } from '../symbols'
import { info } from '../tone'

// 日历 + 右下角时钟
export default ({ radius, stroke }) => withBadge('clock', clock, info, radius, stroke)
