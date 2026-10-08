import { withBadgeTop } from '../monitor'
import { cross } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右上角叉
export default ({ radius, stroke }) => withBadgeTop('cross', cross, danger, radius, stroke)
