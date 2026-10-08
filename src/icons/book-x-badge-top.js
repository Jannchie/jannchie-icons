import { withBadgeTop } from '../book'
import { cross } from '../symbols'
import { danger } from '../tone'

// 书 + 右上角叉
export default ({ radius, stroke }) => withBadgeTop('cross', cross, danger, radius, stroke)
