import { withBadge } from '../chat'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角上箭头
export default ({ radius, stroke }) => withBadge('arrowUp', arrowUp, info, radius, stroke)
