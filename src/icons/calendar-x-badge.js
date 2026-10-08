import { withBadge } from '../calendar'
import { cross } from '../symbols'
import { danger } from '../tone'

// 日历 + 右下角叉
export default ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke)
