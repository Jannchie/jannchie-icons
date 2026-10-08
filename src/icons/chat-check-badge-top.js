import { withBadgeTop } from '../chat'
import { check } from '../symbols'
import { success } from '../tone'

// 对话 + 右上角勾
export default ({ radius, stroke }) => withBadgeTop('check', check, success, radius, stroke)
