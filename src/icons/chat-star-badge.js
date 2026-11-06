import { withBadge } from '../chat'
import { star } from '../symbols'
import { warning } from '../tone'

// 对话 + 右下角收藏
export default ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke, { fill: true })
