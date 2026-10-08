import { withBadge } from '../monitor'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角下箭头
export default ({ radius, stroke }) => withBadge('arrowDown', arrowDown, info, radius, stroke)
