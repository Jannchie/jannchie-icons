import { withBadgeTop } from '../chat'
import { ban } from '../symbols'
import { danger } from '../tone'

// 对话 + 右上角禁止
export default ({ radius, stroke }) => withBadgeTop('ban', ban, danger, radius, stroke)
