import { withBadge } from '../chat'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角右箭头
export default ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke)
