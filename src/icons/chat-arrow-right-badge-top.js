import { withBadgeTop } from '../chat'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角右箭头
export default ({ radius, stroke }) => withBadgeTop('arrowRight', arrowRight, info, radius, stroke)

export const fill = ({ radius, stroke }) => withBadgeTop('arrowRight', arrowRight, info, radius, stroke, { fill: true })
