import { withBadge } from '../pin'
import { cross } from '../symbols'
import { danger } from '../tone'

// 定位针 + 右下角叉
export default ({ radius }) => withBadge('cross', cross, danger, radius)
