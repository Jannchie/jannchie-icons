import { withBadge } from '../mail'
import { check } from '../symbols'
import { success } from '../tone'

// 邮件 + 右下角勾
export default ({ radius, stroke }) => withBadge('check', check, success, radius, stroke)
