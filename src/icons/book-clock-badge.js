import { withBadge } from '../book'
import { clock } from '../symbols'
import { info } from '../tone'

// 书 + 右下角时钟
export default ({ radius, stroke }) => withBadge('clock', clock, info, radius, stroke)
