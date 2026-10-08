import { withBadge } from '../file'
import { check } from '../symbols'
import { success } from '../tone'

// 文件 + 右下角勾
export default ({ radius, stroke }) => withBadge('check', check, success, radius, stroke)
