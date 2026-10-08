import { withBadge } from '../calendar'
import { check } from '../symbols'
import { success } from '../tone'

// 日历 + 右下角勾
export default ({ radius, stroke }) => withBadge('check', check, success, radius, stroke)
