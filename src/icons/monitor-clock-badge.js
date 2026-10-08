import { withBadge } from '../monitor'
import { clock } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角时钟
export default ({ radius, stroke }) => withBadge('clock', clock, info, radius, stroke)
