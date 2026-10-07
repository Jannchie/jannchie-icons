import { withBadge } from '../shield'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 盾 + 右下角下箭头
export default ({ radius }) => withBadge('arrowDown', arrowDown, info, radius)
