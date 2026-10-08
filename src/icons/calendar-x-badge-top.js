import { withBadgeTop } from '../calendar'
import { cross } from '../symbols'
import { danger } from '../tone'

// 日历 + 右上角叉
export default ({ radius, stroke }) => withBadgeTop('cross', cross, danger, radius, stroke)
