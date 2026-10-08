import { withBadge } from '../file'
import { cross } from '../symbols'
import { danger } from '../tone'

// 文件 + 右下角叉
export default ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke)
