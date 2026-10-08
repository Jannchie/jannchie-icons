import { withBadge } from '../shield'
import { clock } from '../symbols'
import { info } from '../tone'

// 盾 + 右下角时钟
export default ({ radius, stroke }) => withBadge('clock', clock, info, radius, stroke)
