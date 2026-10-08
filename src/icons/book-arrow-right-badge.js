import { withBadge } from '../book'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 书 + 右下角右箭头
export default ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke)
