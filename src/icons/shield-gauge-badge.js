import { withBadge } from '../shield'
import { gauge } from '../symbols'
import { info } from '../tone'

// 盾 + 右下角计速器
export default ({ radius, stroke }) => withBadge('gauge', gauge, info, radius, stroke)
