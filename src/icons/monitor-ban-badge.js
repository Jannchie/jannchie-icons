import { withBadge } from '../monitor'
import { ban } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右下角禁止
export default ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke)
