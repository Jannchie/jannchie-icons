import { withBadge } from '../folder'
import { check } from '../symbols'
import { success } from '../tone'

// 文件夹 + 右下角勾
export default ({ radius, stroke }) => withBadge('check', check, success, radius, stroke)
