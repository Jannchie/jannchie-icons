import { withBadgeTop } from '../book'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 书 + 右上角右箭头
export default ({ radius, stroke }) => withBadgeTop('arrowRight', arrowRight, info, radius, stroke)
