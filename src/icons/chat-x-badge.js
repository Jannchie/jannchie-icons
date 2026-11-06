import { withBadge } from '../chat'
import { cross } from '../symbols'
import { danger } from '../tone'

// 对话 + 右下角叉
export default ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke, { fill: true })
