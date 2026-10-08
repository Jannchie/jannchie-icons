import { withBadge } from '../mail'
import { gauge } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角计速器
export default ({ radius, stroke }) => withBadge('gauge', gauge, info, radius, stroke)
