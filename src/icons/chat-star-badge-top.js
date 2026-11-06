import { withBadgeTop } from '../chat'
import { star } from '../symbols'
import { warning } from '../tone'

// 对话 + 右上角收藏
export default ({ radius, stroke }) => withBadgeTop('star', star, warning, radius, stroke)

export const fill = ({ radius, stroke }) => withBadgeTop('star', star, warning, radius, stroke, { fill: true })
