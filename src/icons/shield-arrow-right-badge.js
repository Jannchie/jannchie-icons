import { withBadge } from '../shield'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 盾 + 右下角右箭头
export default ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke, { fill: true })
