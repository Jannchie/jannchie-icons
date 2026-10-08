import { withBadge } from '../briefcase'
import { check } from '../symbols'
import { success } from '../tone'

// 公文包 + 右下角勾
export default ({ radius, stroke }) => withBadge('check', check, success, radius, stroke)
