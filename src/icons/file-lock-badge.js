import { withBadge } from '../file'
import { lock } from '../symbols'
import { warning } from '../tone'

// 文件 + 右下角锁
export default ({ radius, stroke }) => withBadge('lock', lock, warning, radius, stroke)
