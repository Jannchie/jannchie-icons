import { withBadge } from '../file'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 文件 + 右下角下箭头
export default ({ radius, stroke }) => withBadge('arrowDown', arrowDown, info, radius, stroke)
