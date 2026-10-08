import { withBadgeTop } from '../folder'
import { clock } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角时钟
export default ({ radius, stroke }) => withBadgeTop('clock', clock, info, radius, stroke)
