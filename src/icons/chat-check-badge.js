import { withBadge } from '../chat'
import { check } from '../symbols'
import { success } from '../tone'

// 对话 + 右下角勾
export default ({ radius, stroke }) => withBadge('check', check, success, radius, stroke)
