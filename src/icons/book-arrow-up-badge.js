import { withBadge } from '../book'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 书 + 右下角上箭头
export default ({ radius, stroke }) => withBadge('arrowUp', arrowUp, info, radius, stroke)
