import { withBadge } from '../folder'
import { lock } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 右下角锁
export default ({ radius, stroke }) => withBadge('lock', lock, warning, radius, stroke)
