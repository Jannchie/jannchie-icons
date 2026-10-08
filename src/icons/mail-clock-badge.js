import { withBadge } from '../mail'
import { clock } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角时钟
export default ({ radius, stroke }) => withBadge('clock', clock, info, radius, stroke)
