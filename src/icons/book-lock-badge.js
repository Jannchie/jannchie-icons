import { withBadge } from '../book'
import { lock } from '../symbols'
import { warning } from '../tone'

// 书 + 右下角锁
export default ({ radius, stroke }) => withBadge('lock', lock, warning, radius, stroke)
