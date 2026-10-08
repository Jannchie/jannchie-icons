import { withBadge } from '../folder'
import { clock } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角时钟
export default ({ radius, stroke }) => withBadge('clock', clock, info, radius, stroke)
