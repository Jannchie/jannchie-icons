import { withBadge } from '../monitor'
import { cross } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右下角叉
export default ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke)
