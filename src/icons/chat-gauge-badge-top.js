import { withBadgeTop } from '../chat'
import { gauge } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角计速器
export default ({ radius, stroke }) => withBadgeTop('gauge', gauge, info, radius, stroke)
