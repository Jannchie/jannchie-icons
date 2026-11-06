import { withBadge } from '../mail'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角右箭头
export default ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke, { fill: true })
