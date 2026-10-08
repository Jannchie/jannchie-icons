import { withBadge } from '../monitor'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角右箭头
export default ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke)
