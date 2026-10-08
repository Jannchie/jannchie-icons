import { withBadge } from '../briefcase'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 公文包 + 右下角下箭头
export default ({ radius, stroke }) => withBadge('arrowDown', arrowDown, info, radius, stroke)
