import { withBadge } from '../book'
import { cross } from '../symbols'
import { danger } from '../tone'

// 书 + 右下角叉
export default ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke)
