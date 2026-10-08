import { withBadgeTop } from '../calendar'
import { lock } from '../symbols'
import { warning } from '../tone'

// 日历 + 右上角锁
export default ({ radius, stroke }) => withBadgeTop('lock', lock, warning, radius, stroke)
