import { withBadgeTop } from '../calendar'
import { ban } from '../symbols'
import { danger } from '../tone'

// 日历 + 右上角禁止
export default ({ radius, stroke }) => withBadgeTop('ban', ban, danger, radius, stroke)
