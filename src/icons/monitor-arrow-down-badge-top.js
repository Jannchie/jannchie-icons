import { withBadgeTop } from '../monitor'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角下箭头
export default ({ radius, stroke }) => withBadgeTop('arrowDown', arrowDown, info, radius, stroke)
