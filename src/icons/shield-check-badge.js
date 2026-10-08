import { withBadge } from '../shield'
import { check } from '../symbols'
import { success } from '../tone'

// 盾 + 右下角勾
export default ({ radius, stroke }) => withBadge('check', check, success, radius, stroke)
