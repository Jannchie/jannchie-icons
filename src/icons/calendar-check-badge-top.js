import { withBadgeTop } from '../calendar'
import { check } from '../symbols'
import { success } from '../tone'

// 日历 + 右上角勾
export default ({ radius, stroke }) => withBadgeTop('check', check, success, radius, stroke)
