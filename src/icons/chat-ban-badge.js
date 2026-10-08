import { withBadge } from '../chat'
import { ban } from '../symbols'
import { danger } from '../tone'

// 对话 + 右下角禁止
export default ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke)
