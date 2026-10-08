import { withBadge } from '../briefcase'
import { clock } from '../symbols'
import { info } from '../tone'

// 公文包 + 右下角时钟
export default ({ radius, stroke }) => withBadge('clock', clock, info, radius, stroke)
