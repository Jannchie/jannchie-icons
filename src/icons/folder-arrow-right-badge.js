import { withBadge } from '../folder'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角右箭头
export default ({ radius, stroke }) => withBadge('arrowRight', arrowRight, info, radius, stroke)
