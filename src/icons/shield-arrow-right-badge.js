import { withBadge } from '../shield'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 盾 + 右下角右箭头
export default ({ radius }) => withBadge('arrowRight', arrowRight, info, radius)
