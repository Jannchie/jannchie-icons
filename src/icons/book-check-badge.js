import { withBadge } from '../book'
import { check } from '../symbols'
import { success } from '../tone'

// 书 + 右下角勾
export default ({ radius, stroke }) => withBadge('check', check, success, radius, stroke)
