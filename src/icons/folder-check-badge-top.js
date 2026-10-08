import { withBadgeTop } from '../folder'
import { check } from '../symbols'
import { success } from '../tone'

// 文件夹 + 右上角勾
export default ({ radius, stroke }) => withBadgeTop('check', check, success, radius, stroke)
