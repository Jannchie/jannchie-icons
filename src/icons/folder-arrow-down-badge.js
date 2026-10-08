import { withBadge } from '../folder'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角下箭头
export default ({ radius, stroke }) => withBadge('arrowDown', arrowDown, info, radius, stroke)
