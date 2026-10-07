import { withBadge } from '../pin'
import { clock } from '../symbols'
import { info } from '../tone'

// 定位针 + 右下角时钟
export default ({ radius }) => withBadge('clock', clock, info, radius)
