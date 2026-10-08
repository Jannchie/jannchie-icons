import { withBadgeTop } from '../monitor'
import { lock } from '../symbols'
import { warning } from '../tone'

// 显示器 + 右上角锁
export default ({ radius, stroke }) => withBadgeTop('lock', lock, warning, radius, stroke)
