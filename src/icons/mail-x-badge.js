import { withBadge } from '../mail'
import { cross } from '../symbols'
import { danger } from '../tone'

// 邮件 + 右下角叉
export default ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke)
