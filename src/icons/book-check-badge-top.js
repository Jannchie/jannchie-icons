import { withBadgeTop } from '../book'
import { check } from '../symbols'
import { success } from '../tone'

// 书 + 右上角勾
export default ({ radius, stroke }) => withBadgeTop('check', check, success, radius, stroke)
