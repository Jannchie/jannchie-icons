import { withBadge } from '../shield'
import { lock } from '../symbols'
import { warning } from '../tone'

// 盾 + 右下角锁
export default ({ radius, stroke }) => withBadge('lock', lock, warning, radius, stroke)
