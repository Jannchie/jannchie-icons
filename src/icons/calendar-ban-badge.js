import { withBadge } from '../calendar'
import { ban } from '../symbols'
import { danger } from '../tone'

// 日历 + 右下角禁止
export default ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke)
