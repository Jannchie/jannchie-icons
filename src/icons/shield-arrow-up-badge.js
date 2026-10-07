import { withBadge } from '../shield'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 盾 + 右下角上箭头
export default ({ radius }) => withBadge('arrowUp', arrowUp, info, radius)
