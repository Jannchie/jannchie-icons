import { withBadgeTop } from '../folder'
import { cross } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右上角叉
export default ({ radius, stroke }) => withBadgeTop('cross', cross, danger, radius, stroke)
