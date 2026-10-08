import { withBadgeTop } from '../monitor'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角右箭头
export default ({ radius, stroke }) => withBadgeTop('arrowRight', arrowRight, info, radius, stroke)
