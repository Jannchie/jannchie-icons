import { withBadge } from '../calendar'
import { lock } from '../symbols'
import { warning } from '../tone'

// 日历 + 右下角锁
export default ({ radius, stroke }) => withBadge('lock', lock, warning, radius, stroke)
