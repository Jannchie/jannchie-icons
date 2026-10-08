import { withBadge } from '../briefcase'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 公文包 + 右下角右箭头
export default ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke)
