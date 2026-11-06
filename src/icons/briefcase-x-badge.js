import { withBadge } from '../briefcase'
import { cross } from '../symbols'
import { danger } from '../tone'

// 公文包 + 右下角叉
export default ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke, { fill: true })
