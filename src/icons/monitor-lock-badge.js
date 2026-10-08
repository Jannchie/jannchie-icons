import { withBadge } from '../monitor'
import { lock } from '../symbols'
import { warning } from '../tone'

// 显示器 + 右下角锁
export default ({ radius, stroke }) => withBadge('lock', lock, warning, radius, stroke)
