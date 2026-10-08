import { withBadgeTop } from '../chat'
import { cross } from '../symbols'
import { danger } from '../tone'

// 对话 + 右上角叉
export default ({ radius, stroke }) => withBadgeTop('cross', cross, danger, radius, stroke)
