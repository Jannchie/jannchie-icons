import { withBadgeTop } from '../book'
import { lock } from '../symbols'
import { warning } from '../tone'

// 书 + 右上角锁
export default ({ radius, stroke }) => withBadgeTop('lock', lock, warning, radius, stroke)
