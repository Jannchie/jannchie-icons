import { withBadge } from '../monitor'
import { check } from '../symbols'
import { success } from '../tone'

// 显示器 + 右下角勾
export default ({ radius, stroke }) => withBadge('check', check, success, radius, stroke)
