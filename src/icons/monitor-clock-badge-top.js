import { withBadgeTop } from '../monitor'
import { clock } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角时钟
export default ({ radius, stroke }) => withBadgeTop('clock', clock, info, radius, stroke)
