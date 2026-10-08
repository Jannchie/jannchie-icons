import { withBadge } from '../chat'
import { gauge } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角计速器
export default ({ radius, stroke }) => withBadge('gauge', gauge, info, radius, stroke)
