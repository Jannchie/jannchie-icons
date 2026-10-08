import { withBadge } from '../mail'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角左箭头
export default ({ radius, stroke }) => withBadge('arrowLeft', arrowLeft, info, radius, stroke)
