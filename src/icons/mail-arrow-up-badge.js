import { withBadge } from '../mail'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角上箭头
export default ({ radius, stroke }) => withBadge('arrowUp', arrowUp, info, radius, stroke)
