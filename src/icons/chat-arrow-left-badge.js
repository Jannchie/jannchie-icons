import { withBadge } from '../chat'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角左箭头
export default ({ radius, stroke }) => withBadge('arrowLeft', arrowLeft, info, radius, stroke)
