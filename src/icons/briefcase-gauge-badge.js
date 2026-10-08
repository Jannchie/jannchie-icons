import { withBadge } from '../briefcase'
import { gauge } from '../symbols'
import { info } from '../tone'

// 公文包 + 右下角计速器
export default ({ radius, stroke }) => withBadge('gauge', gauge, info, radius, stroke)
