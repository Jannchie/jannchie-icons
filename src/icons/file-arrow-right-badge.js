import { withBadge } from '../file'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 文件 + 右下角右箭头
export default ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke)
