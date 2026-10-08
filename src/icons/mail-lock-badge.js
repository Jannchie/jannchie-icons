import { withBadge } from '../mail'
import { lock } from '../symbols'
import { warning } from '../tone'

// 邮件 + 右下角锁
export default ({ radius, stroke }) => withBadge('lock', lock, warning, radius, stroke)
