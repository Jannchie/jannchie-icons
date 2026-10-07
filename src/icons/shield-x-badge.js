import { withBadge } from '../shield'
import { cross } from '../symbols'
import { danger } from '../tone'

// 盾 + 右下角叉
export default ({ radius }) => withBadge('cross', cross, danger, radius)
