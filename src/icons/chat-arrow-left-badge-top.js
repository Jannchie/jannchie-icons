import { withBadgeTop } from '../chat'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角左箭头
export default ({ radius, stroke }) => withBadgeTop('arrowLeft', arrowLeft, info, radius, stroke)

export const fill = ({ radius, stroke }) => withBadgeTop('arrowLeft', arrowLeft, info, radius, stroke, { fill: true })
