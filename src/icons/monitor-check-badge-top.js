import { withBadgeTop } from '../monitor'
import { check } from '../symbols'
import { success } from '../tone'

// 显示器 + 右上角勾
export default ({ radius, stroke }) => withBadgeTop('check', check, success, radius, stroke)
