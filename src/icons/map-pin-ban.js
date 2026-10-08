import { withBadge } from '../pin'
import { ban } from '../symbols'
import { danger } from '../tone'

// 定位针 + 右下角禁止
export default ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke)
