import { withBadgeTop } from '../chat'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角上箭头
export default ({ radius, stroke }) => withBadgeTop('arrowUp', arrowUp, info, radius, stroke)
