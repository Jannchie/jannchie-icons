import { withBadge } from '../pin'
import { check } from '../symbols'
import { success } from '../tone'

// 定位针 + 右下角对勾
export default ({ radius }) => withBadge('check', check, success, radius)
