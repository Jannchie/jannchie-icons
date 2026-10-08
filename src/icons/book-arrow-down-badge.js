import { withBadge } from '../book'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 书 + 右下角下箭头
export default ({ radius, stroke }) => withBadge('arrowDown', arrowDown, info, radius, stroke)
