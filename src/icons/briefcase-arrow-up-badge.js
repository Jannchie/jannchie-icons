import { withBadge } from '../briefcase'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 公文包 + 右下角上箭头
export default ({ radius, stroke }) => withBadge('arrowUp', arrowUp, info, radius, stroke)
